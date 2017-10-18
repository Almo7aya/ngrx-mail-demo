import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailboxControlsComponent } from './mailbox/mailbox-controls/mailbox-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailboxControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
