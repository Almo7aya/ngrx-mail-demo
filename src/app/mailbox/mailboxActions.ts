import { Action } from '@ngrx/store';
import { MailMessage } from '../mail-message';

export const INBOX_LOADED = 'INBOX_LOADED';
export const INBOX_LOADING = 'INBOX_LOADING';
export const OUTBOX_LOADED = 'OUTBOX_LOADED';
export const OUTBOX_LOADING = 'OUTBOX_LOADING';

export class InboxLoaded implements Action {
  readonly type = INBOX_LOADED;

  constructor(public payload: MailMessage[]) {}
}

export class InboxLoading implements Action {
  readonly type = INBOX_LOADING;
}

export class OutboxLoaded implements Action {
  readonly type = OUTBOX_LOADED;

  constructor(public payload: MailMessage[]) {}
}

export class OutboxLoading implements Action {
  readonly type = OUTBOX_LOADING;
}

export type Actions = InboxLoaded | InboxLoading | OutboxLoaded | OutboxLoading;
