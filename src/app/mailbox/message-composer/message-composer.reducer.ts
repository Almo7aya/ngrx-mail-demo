import * as messageComposer from './message-composer.actions';
import { MailMessage } from '../../mail-message';

export interface State {
  loading: boolean;
  message: MailMessage;
}

const initialState: State = {
  loading: false,
  message: null
};

export function messageComposerReducer(state = initialState, action: messageComposer.Actions): State {

  switch (action.type) {

    case messageComposer.MESSAGE_SEND: {
      return {
        ...state,
        loading: true,
        message: null
      };
    }

    case messageComposer.MESSAGE_SEND_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: null
      };
    }

    case messageComposer.MESSAGE_SEND_FAILED: {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    }

    default: {
      return state;
    }
  }
}
