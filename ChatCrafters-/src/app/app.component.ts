import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'ChatAppStep';
  public messageHistory = '';
  public username: string = '';
  public messages: { timestamp: string, username: string,  text: string }[] = [];

  public messageSubmitted(message: string): void {
    this.messageHistory += message;
  }

  public sendMessage(message: string): void {   
    this.messages.push({ timestamp: new Date().toISOString(), username: this.username, text: message });
  }
  
}