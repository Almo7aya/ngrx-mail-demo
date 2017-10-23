import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { MailboxComponent } from './mailbox/mailbox.component';
import { MessageReaderComponent } from './mailbox/message-reader/message-reader.component';

const routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full'},
  { path: 'inbox', component: MailboxComponent,
    children: [
      { path: 'view', redirectTo: '/inbox', pathMatch: 'full' },
      { path: 'view/:messageId', component: MessageReaderComponent },
    ]
  },
  { path: 'outbox', component: MailboxComponent,
    children: [
      { path: 'view', redirectTo: '/outbox', pathMatch: 'full' },
      { path: 'view/:messageId', component: MessageReaderComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
