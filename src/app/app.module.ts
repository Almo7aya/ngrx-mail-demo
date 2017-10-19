import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailboxControlsComponent } from './mailbox/mailbox-controls/mailbox-controls.component';
import { CustomRouterStateSerializer} from './utils';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailboxControlsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    StoreModule.forRoot({ routerReducer: routerReducer }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
