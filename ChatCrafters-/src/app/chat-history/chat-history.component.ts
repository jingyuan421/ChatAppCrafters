import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ChatService } from '../shared/services/chat.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { ChatMessage } from '../shared/models/chat-message';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  @Input() public username = '';

  public chatMessages: ChatMessage[] = [];
  public errorMessage = '';

  private destroyed = new Subject<void>();

  @ViewChild('scrollFrame') private scrollFrame!: ElementRef<HTMLElement>;

  constructor(private chatService: ChatService) { }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.getHistory();
    this.scrollTo();

    setInterval(() => {
      this.getHistory();
    }, 2000);
  }

  public isItMe(username: string): boolean {
    return this.username?.toLowerCase() === username?.toLowerCase();
  }

  private getHistory(): void {
    this.chatService
      .getChatMessages()
      .pipe(
        finalize(() => console.log('done!')),
        takeUntil(this.destroyed)
      )
      .subscribe({
        next: (response: ChatMessage[]) => {
          this.chatMessages = response;
          this.scrollTo();
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
        },
      });
  }

  private scrollTo(): void {
    this.scrollFrame?.nativeElement?.scroll({
      top: this.scrollFrame?.nativeElement?.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
}





