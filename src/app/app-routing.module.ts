import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { MailboxComponent } from './mailbox/mailbox.component';

const routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full'},
  { path: 'inbox', component: MailboxComponent },
  { path: 'outbox', component: MailboxComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
