import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { FormsModule } from '@angular/forms';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { UsernameComponent } from './username/username.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatBarComponent,
    ChatHistoryComponent,
    UsernameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule // Include HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






