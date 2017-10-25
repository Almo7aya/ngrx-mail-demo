import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Actions, Effect } from '@ngrx/effects';

import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import {
  MESSAGE_LOADING, MessageLoading, MessageLoaded, MESSAGE_DELETING, MessageDeleting,
  MessageDeleted, MessageDeleteFailed, MessageLoadFailed, MESSAGE_LOAD_FAILED
} from './message-reader.actions';

import { MailService } from '../../mail.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';


@Injectable()
export class MessageReaderEffects {
  constructor(private actions$: Actions, private mailService: MailService ) {}

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
  loadMessage$ = this.actions$.ofType(MESSAGE_LOADING)
    .switchMap((action: MessageLoading) => {
      const mailbox = action.payload.mailbox;
      const messageId = action.payload.messageId;
      const getMessage = mailbox === 'inbox' ?
        this.mailService.getInboxMessage :
        this.mailService.getOutboxMessage;

      return getMessage.call(this.mailService, messageId)
        .map(message => new MessageLoaded(message))
        .catch(error => Observable.of(new MessageLoadFailed({messageId: messageId, error: error})));
    });

  @Effect()
  deleteMessage$ = this.actions$.ofType(MESSAGE_DELETING)
    .switchMap((action: MessageDeleting) => {
      const message = action.payload.message;
      const mailbox = action.payload.mailbox;

      return this.mailService
        .deleteMessage(mailbox, message.id)
        .map(response =>  new MessageDeleted({mailbox: mailbox}))
        .catch(error => Observable.of(new MessageDeleteFailed({mailbox: mailbox, message: message})));
    });

  @Effect({dispatch: false})
  loadMessageFailed$ = this.actions$.ofType(MESSAGE_LOAD_FAILED)
    .do((action: MessageLoadFailed) => {
      const messageId = action.payload.messageId;
      const error = action.payload.error;
      console.error('Unable to load message: ' + messageId, error);
    });
}
