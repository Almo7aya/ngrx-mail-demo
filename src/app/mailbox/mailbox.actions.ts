import { Action } from '@ngrx/store';
import { MailMessage } from '../mail-message';

export const INBOX_LOADED = 'Inbox Loaded (Mailbox)';
export const INBOX_LOADING = 'Inbox Loading (Mailbox)';
export const OUTBOX_LOADED = 'Outbox Loaded (Mailbox)';
export const OUTBOX_LOADING = 'Outbox Loading (Mailbox)';

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
