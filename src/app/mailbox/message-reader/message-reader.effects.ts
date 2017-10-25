import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Actions, Effect } from '@ngrx/effects';

import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import {
  MESSAGE_LOADING, MessageLoading, MessageLoaded, MESSAGE_DELETING, MessageDeleting,
  MessageDeleted, MessageDeleteFailed
} from './message-reader.actions';

import { MailService } from '../../mail.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
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

      // TODO: Handle errors
      return getMessage.call(this.mailService, messageId)
        .map(message => {
          return new MessageLoaded(message);
        });
    });

  @Effect()
  deleteMessage$ = this.actions$.ofType(MESSAGE_DELETING)
    .switchMap((action: MessageDeleting) => {
      const message = action.payload.message;
      const mailbox = action.payload.mailbox;

      return this.mailService
        .deleteMessage(mailbox, message.id)
        .map(response =>  new MessageDeleted({mailbox: mailbox}))
        .catch(error => {
          return Observable.of(new MessageDeleteFailed({mailbox: mailbox, message: message}));
        });
    });
}
