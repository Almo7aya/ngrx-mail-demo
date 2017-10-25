import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { MailMessage } from './mail-message';

@Injectable()
export class MailService {
  hostUrl =  'http://localhost:3000';
  constructor(private http: Http) { }

  getInboxMessages(): Observable<MailMessage[]> {
    const url = `${this.hostUrl}/inbox`;

    return this.http
      .get(url)
      .map(response => response.json() as MailMessage[]);
  }

  getInboxMessage(id: string): Observable<MailMessage> {
    const url = `${this.hostUrl}/inbox`;

    return this.http
      .get(url)
      .map(response => response.json().find(message => message.id === id) as MailMessage);
  }

  getOutboxMessages(): Observable<MailMessage[]> {
    const url = `${this.hostUrl}/outbox`;

    return this.http
      .get(url)
      .map(response => response.json() as MailMessage[]);
  }

  getOutboxMessage(id: string): Observable<MailMessage> {
    const url = `${this.hostUrl}/outbox`;

    return this.http
      .get(url)
      .map(response => response.json().find(message => message.id === id) as MailMessage);
  }

  deleteMessage(mailbox: string, id: string) {
    const url = `${this.hostUrl}/${mailbox}/${id}`;

    return this.http
      .delete(url)
      .map(res => res);
  }

  sendMessage(message: MailMessage): Observable<MailMessage> {
    const url = `${this.hostUrl}/outbox`;

    return this.http
      .post(url, message)
      .map(res => res.json() as MailMessage)
      .catch(this.handleError);
  }

  // TODO: Change error handling for effects
  handleError(e) {
    console.error(e);
    return Observable.throw(new Error(e));
  }
}
