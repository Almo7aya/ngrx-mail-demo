import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Actions, Effect } from '@ngrx/effects';

import { MailService } from '../../mail.service';
import {
  MESSAGE_SEND, MESSAGE_SEND_FAILED, MESSAGE_SEND_SUCCESS, MessageSend, MessageSendFailed,
  MessageSendSuccess
} from './message-composer.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';


@Injectable()
export class MessageComposerEffects {
  constructor(private actions$: Actions, private mailService: MailService, private router: Router, private route: ActivatedRoute) {}

  @Effect()
  sendMessage$ = this.actions$.ofType(MESSAGE_SEND)
    .switchMap(({payload}: MessageSend) => {
      return this.mailService
        .sendMessage(payload.message)
        .map(response => new MessageSendSuccess({message: response, mailbox: payload.mailbox}))
        .catch(error => Observable.of(new MessageSendFailed({message: payload.message, error: error})));
    });

  @Effect({dispatch: false})
  sendMessageSuccess$ = this.actions$.ofType(MESSAGE_SEND_SUCCESS)
    .do(({payload}: MessageSendSuccess) => {
      console.log(this.route);
      const mailbox = payload.mailbox;
      const messageId = payload.message.id;
      const url = mailbox === 'outbox' ? `/outbox/view/${messageId}` : '/inbox';

      this.router.navigateByUrl(url);
    });

  @Effect({dispatch: false})
  sendMessageFailed$ = this.actions$.ofType(MESSAGE_SEND_FAILED)
    .do(({payload}: MessageSendFailed) => {
      const message = payload.message;
      const error = payload.error;

      console.error('Unable to send message', message, error);
    });
}
