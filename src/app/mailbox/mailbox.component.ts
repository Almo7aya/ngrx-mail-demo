import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/';
import { Store } from '@ngrx/store';

import { MailMessage } from '../mail-message';

@Component({
  selector: 'mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent implements OnInit {

  mailbox: string;
  messages$: Observable<MailMessage[]>;

  constructor( private route: ActivatedRoute, private store: Store<any> ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.mailbox = url[0].path;
    });

    this.messages$ = this.store.select(s => {
      return this.inboxActive() ?
        s.mailboxReducer.inbox.messages :
        s.mailboxReducer.outbox.messages;
    });
  }

  inboxActive(): boolean {
    return this.mailbox === 'inbox';
  }

  outboxActive(): boolean {
    return this.mailbox === 'outbox';
  }
}
