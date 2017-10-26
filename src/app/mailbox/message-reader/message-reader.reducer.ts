import * as messageReader from './message-reader.actions';
import * as mailbox from '../mailbox.actions';
import { MailMessage } from '../../mail-message';

export interface State {
  loading: boolean;
  currentMessage: MailMessage;
}

const initialState: State = {
  loading: false,
  currentMessage: null
};

export function messageReaderReducer(state = initialState, action: messageReader.Actions | mailbox.Actions): State {

  switch (action.type) {

    case messageReader.MESSAGE_LOADING: {
      return {
        ...state,
        loading: true,
        currentMessage: null
      };
    }

    case messageReader.MESSAGE_LOADED: {
      return {
        ...state,
        loading: false,
        currentMessage: action.payload
      };
    }

    case messageReader.MESSAGE_LOAD_FAILED: {
      return {
        ...state,
        loading: false
      };
    }

    case messageReader.MESSAGE_DELETE_FAILED: {
      return {
        ...state,
        loading: false,
        currentMessage: action.payload.message
      };
    }

    case messageReader.MESSAGE_DELETED: {
      return {
        ...state,
        loading: false,
      };
    }

    case messageReader.MESSAGE_DELETING: {
      return {
        ...state,
        loading: true,
        currentMessage: null
      };
    }

    case mailbox.INBOX_LOADING: {
      return {
        ...state,
        currentMessage: null
      };
    }

    case mailbox.OUTBOX_LOADING: {
      return {
        ...state,
        currentMessage: null
      };
    }

    default: {
      return state;
    }
  }
}
