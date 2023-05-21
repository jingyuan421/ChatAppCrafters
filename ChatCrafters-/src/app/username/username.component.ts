import { Component, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent {
  public username: string = '';
  public usernameSaved: boolean = false;
  public errorMessage: string = '';

  constructor(private chatService: ChatService) { }

  @Output() saveUsernameEvent = new EventEmitter<any>();

  public saveUsername(): void {
    const alphanumericRegex = /^[a-zA-Z0-9 ]+$/; // regular expression for alphanumeric characters and spaces
    if (this.username.trim() !== '') {
      if (alphanumericRegex.test(this.username)) { // check if the input matches the regex
        if (this.usernameSaved) {
          this.username = '';
          this.usernameSaved = false;
          this.saveUsernameEvent.emit(null); // emit a logout event
        } else {
          this.chatService
          .checkUsername(this.username)
          .subscribe({
            next: (res) => {
              this.errorMessage = '';
              this.usernameSaved = true;
              this.saveUsernameEvent.emit(this.username);
            },
            error: (error: Error) => {
              this.errorMessage = 'Bitte geben Sie einen anderen Benutzernamen ein!';
            },
          });
        }
      } else {
        this.errorMessage = 'Bitte geben Sie nur Buchstaben und Zahlen ein!';
      }
    }
  }
}




