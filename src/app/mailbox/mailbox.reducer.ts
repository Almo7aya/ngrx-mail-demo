import * as mailbox from './mailbox.actions';
import * as messageReader from './message-reader/message-reader.actions';
import { MailMessage } from '../mail-message';

export interface State {
  inbox: MailboxState;
  outbox: MailboxState;
}

export interface MailboxState {
  loading: boolean;
  messages: MailMessage[];
}

const initialState: State = {
  inbox: {
    loading: false,
    messages: []
  },
  outbox: {
    loading: false,
    messages: []
  }
};

export function mailboxReducer(state = initialState, action: mailbox.Actions | messageReader.Actions ): State {

  switch (action.type) {
    case mailbox.INBOX_LOADED: {
      return {
        ...state,
        inbox: {
          loading: false,
          messages: action.payload
        }
      };
    }

    case mailbox.INBOX_LOADING: {
      return {
        ...state,
        inbox: {
          loading: true,
          messages: state.inbox.messages
        }
      };
    }

    case mailbox.OUTBOX_LOADED: {
      return {
        ...state,
        outbox: {
          loading: false,
          messages: action.payload
        }
      };
    }

    case mailbox.OUTBOX_LOADING: {
      return {
        ...state,
        outbox: {
          loading: true,
          messages: state.outbox.messages
        }
      };
    }

    case mailbox.MAILBOX_LOAD_FAILED: {
      const mailboxId = action.payload.mailbox;
      return {
        ...state,
        [mailboxId]: {
          loading: false,
          messages: state[mailboxId].messages
        }
      };
    }

    case messageReader.MESSAGE_DELETING: {
      const mailboxId = action.payload.mailbox;
      const messageId = action.payload.message.id;

      return {
        ...state,
        [mailboxId]: {
          messages: state[mailboxId].messages.filter(m => m.id !== messageId)
        }
      };
    }

    case messageReader.MESSAGE_DELETE_FAILED: {
      const mailboxId = action.payload.mailbox;
      const message = action.payload.message;

      console.log(state[mailboxId]);
      return {
        ...state,
        [mailboxId]: {
          messages: state[mailboxId].messages.concat([message])
        }
      };
    }

    default: {
      return state;
    }
  }
}
