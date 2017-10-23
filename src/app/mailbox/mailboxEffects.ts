import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import {
  INBOX_LOADING, InboxLoaded, OUTBOX_LOADING, OutboxLoaded, MessageLoading,
  MESSAGE_LOADING, MessageLoaded
} from './mailboxActions';
import { MailService } from '../mail.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class MailboxEffects {
  constructor(private actions$: Actions, private mailService: MailService) {}

  @Effect()
  navigateToInbox$ = this.actions$.ofType(ROUTER_NAVIGATION)
    .filter((action: RouterNavigationAction) => action.payload.routerState.url.startsWith('/inbox'))
    .map(action => ({type: INBOX_LOADING}));

  @Effect()
  navigateToOutbox$ = this.actions$.ofType(ROUTER_NAVIGATION)
    .filter((action: RouterNavigationAction) => action.payload.routerState.url.startsWith('/outbox'))
    .map(action => ({type: OUTBOX_LOADING}));

  @Effect()
  navigateToMessage$ = this.actions$.ofType(ROUTER_NAVIGATION)
    .filter((action: RouterNavigationAction) => {
      const url = action.payload.routerState.url;
      return url.startsWith('/inbox/view') || url.startsWith('/outbox/view');
    })
    .map((action: RouterNavigationAction) => {
      const url = action.payload.routerState.url.split('/');
      return new MessageLoading({mailbox: url[1], messageId: url[3]});
    });

  @Effect()
  loadInbox$ = this.actions$.ofType(INBOX_LOADING)
    .switchMap(action => {
      // TODO: Handle errors
      return this.mailService
        .getInboxMessages()
        .map(messages => new InboxLoaded(messages));
      });

  @Effect()
  loadOutbox$ = this.actions$.ofType(OUTBOX_LOADING)
    .switchMap(action => {
      // TODO: Handle errors
      return this.mailService
        .getOutboxMessages()
        .map(messages => {
          return new OutboxLoaded(messages);
        });
    });

  @Effect()
  loadMessage$ = this.actions$.ofType(MESSAGE_LOADING)
    .switchMap((action: MessageLoading) => {
      console.log(action.payload);
      const mailbox = action.payload.mailbox;
      const messageId = action.payload.messageId;
      const getMessage = mailbox === 'inbox' ?
        this.mailService.getInboxMessage :
        this.mailService.getOutboxMessage;

      return getMessage.call(this.mailService, messageId)
        .map(message => {
          return new MessageLoaded(message);
        });
    });
}
