import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MailMessage } from '../../mail-message';

@Component({
  selector: 'message-reader',
  templateUrl: './message-reader.component.html',
  styleUrls: ['./message-reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageReaderComponent implements OnInit {

  message$: Observable<MailMessage>;

  constructor( private route: ActivatedRoute, private router: Router, private store: Store<any>) { }

  ngOnInit() {
    this.message$ = this.store.select(s => {
      return s.mailbox.viewingMessage;
    });
  }

  deleteMessage() {
    // TODO: Add output, wire up to mailbox...
  }
}
