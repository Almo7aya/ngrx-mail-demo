import * as mailbox from './mailboxActions';
import { MailMessage } from '../mail-message';

export interface State {
  messageLoading: boolean;
  viewingMessage: MailMessage;
  inbox: MailboxState;
  outbox: MailboxState;
}

export interface MailboxState {
  loading: boolean;
  messages: MailMessage[];
}

const initialState: State = {
  messageLoading: false,
  viewingMessage: null,
  inbox: {
    loading: false,
    messages: []
  },
  outbox: {
    loading: false,
    messages: []
  }
};

export function mailboxReducer(state = initialState, action: mailbox.Actions): State {

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
        viewingMessage: null,
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
        viewingMessage: null,
        outbox: {
          loading: true,
          messages: state.outbox.messages
        }
      };
    }

    case mailbox.MESSAGE_LOADING: {
      return {
        ...state,
        viewingMessage: null,
        messageLoading: true
      };
    }

    case mailbox.MESSAGE_LOADED: {
      return {
        ...state,
        messageLoading: false,
        viewingMessage: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
