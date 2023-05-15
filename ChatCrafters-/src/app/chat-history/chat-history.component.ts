import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements AfterViewInit {
  @Input() history = '';
  @Input() messageList: { timestamp: string, username: string, text: string }[] = [];
  @ViewChild('chatHistory', { static: false }) private chatHistory!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  public showDate(index: number) {
    if (index == 0) {
      return true
    } else {
      let lastDate = new Date(this.messageList[index - 1].timestamp)
      let nowDate = new Date(this.messageList[index].timestamp)
      if (lastDate.getDate() == nowDate.getDate()) {
        return false
      } else {
        return true
      }
    }
  }

  private scrollToBottom(): void {
    if (this.chatHistory) {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    }
  }
}




