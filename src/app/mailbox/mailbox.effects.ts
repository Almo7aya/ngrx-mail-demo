import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import {MESSAGE_DELETED, MessageDeleted} from './message-reader/message-reader.actions';

import {
  INBOX_LOADING, InboxLoaded, MAILBOX_LOAD_FAILED, MailboxLoadFailed, OUTBOX_LOADING,
  OutboxLoaded
} from './mailbox.actions';
import { MailService } from '../mail.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MailboxEffects {
  constructor(private actions$: Actions, private mailService: MailService, private router: Router) {}

  @Effect()
  navigateToInbox$ = this.actions$.ofType(ROUTER_NAVIGATION)
    .filter((action: RouterNavigationAction) => action.payload.routerState.url.startsWith('/inbox'))
    .map(action => ({type: INBOX_LOADING}));

  @Effect()
  navigateToOutbox$ = this.actions$.ofType(ROUTER_NAVIGATION)
    .filter((action: RouterNavigationAction) => action.payload.routerState.url.startsWith('/outbox'))
    .map(action => ({type: OUTBOX_LOADING}));

  @Effect()
  loadInbox$ = this.actions$.ofType(INBOX_LOADING)
    .switchMap(action => {
      return this.mailService
        .getInboxMessages()
        .map(messages => new InboxLoaded(messages))
        .catch(error => Observable.of(new MailboxLoadFailed({mailbox: 'inbox', error: error})));
      });

  @Effect()
  loadOutbox$ = this.actions$.ofType(OUTBOX_LOADING)
    .switchMap(action => {
      return this.mailService
        .getOutboxMessages()
        .map(messages => new OutboxLoaded(messages))
        .catch(error => Observable.of(new MailboxLoadFailed({mailbox: 'outbox', error: error})));
    });

  @Effect({dispatch: false})
  routeToMailboxOnDelete$ = this.actions$.ofType(MESSAGE_DELETED)
    .do((action: MessageDeleted) => {
      const mailbox = action.payload.mailbox;
      this.router.navigate([mailbox], {replaceUrl: true});
    });

  @Effect({dispatch: false})
  mailboxLoadFailed$ = this.actions$.ofType(MAILBOX_LOAD_FAILED)
    .do((action: MailboxLoadFailed) => {
      const mailboxId = action.payload.mailbox;
      const error = action.payload.error;
      console.error('Unable to load mailbox: ' + mailboxId, error);
    });
}
