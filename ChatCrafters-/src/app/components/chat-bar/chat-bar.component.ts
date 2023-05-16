import { Component, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../shared/services/chat.service';
import { ChatMessage } from '../../shared/models/chat-message';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css'],
})
export class ChatBarComponent implements OnDestroy {
  @Input() username = '';

  public chatMessage = '';
  public errorMessage = '';
  public buttonSaving = false;

  private destroyed = new Subject<void>();

  constructor(private chatService: ChatService) { }

  public ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public addMessage(message: string): void {
    if (!message.trim()) {
      this.errorMessage = 'Please add text!';
      this.chatMessage = '';

      return;
    }

    if (!this.username) {
      this.errorMessage = 'Please provide a username!';
      this.chatMessage = '';

      return;
    }

    const messageToSend: ChatMessage = {
      message: message,
      username: this.username,
    };

    this.buttonSaving = true;
    this.chatService
      .addToHistory(messageToSend)
      .pipe(
        finalize(() => (this.buttonSaving = false)),
        takeUntil(this.destroyed)
      )
      .subscribe({
        next: () => {
          this.chatMessage = '';
          this.errorMessage = '';
        },
        error: (error: Error) => {
          // never show server messages. just for testing
          this.errorMessage = error.message;
          // log to log-server
        },
      });
  }
}



