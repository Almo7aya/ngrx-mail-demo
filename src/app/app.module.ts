import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';

import { CustomRouterStateSerializer } from './utils';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailboxControlsComponent } from './mailbox/mailbox-controls/mailbox-controls.component';
import { MailboxEffects } from './mailbox/mailbox.effects';
import { mailboxReducer } from './mailbox/mailbox.reducer';

import { MailService } from './mail.service';

import { MessageReaderContainerComponent } from './mailbox/message-reader/message-reader-container.component';
import { MessageReaderComponent } from './mailbox/message-reader/message-reader.component';
import { MessageReaderEffects } from './mailbox/message-reader/message-reader.effects';
import { messageReaderReducer } from './mailbox/message-reader/message-reader.reducer';

import { MessageComposerComponent } from './mailbox/message-composer/message-composer.component';

import { environment } from '../environments/environment';


const reducers = {
  router: routerReducer,
  mailbox: mailboxReducer,
  messageReader: messageReaderReducer
};

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailboxControlsComponent,
    MessageReaderContainerComponent,
    MessageReaderComponent,
    MessageComposerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([MailboxEffects, MessageReaderEffects]),
  ],
  providers: [
    MailService,
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
