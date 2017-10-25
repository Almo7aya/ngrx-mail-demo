import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import {MESSAGE_DELETED, MessageDeleted} from './message-reader/message-reader.actions';

import { INBOX_LOADING, InboxLoaded, OUTBOX_LOADING, OutboxLoaded } from './mailbox.actions';
import { MailService } from '../mail.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

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

  @Effect({dispatch: false})
  routeToMailboxOnDelete$ = this.actions$.ofType(MESSAGE_DELETED)
    .do((action: MessageDeleted) => {
      const mailbox = action.payload.mailbox;
      this.router.navigate([mailbox], {replaceUrl: true});
    });
}
