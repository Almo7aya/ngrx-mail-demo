import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/';

import { MailMessage } from '../mail-message';

@Component({
  selector: 'mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent implements OnInit, OnDestroy {

  mailbox: string;
  messages: MailMessage[];
  subscription: Subscription;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.subscription = this.route.url.subscribe(url => {
      this.mailbox = url[0].path;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  inboxActive(): boolean {
    return this.mailbox === 'inbox';
  }

  outboxActive(): boolean {
    return this.mailbox === 'outbox';
  }
}
