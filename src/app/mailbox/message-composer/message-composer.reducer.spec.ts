import {State, messageComposerReducer} from './message-composer.reducer';
import * as messageComposer from './message-composer.actions';
import {MailMessage} from '../../mail-message';

describe('MessageComposerReducer', () => {
  const reducer = messageComposerReducer;

  it('returns initial state by default', () => {
    const state = messageComposerReducer(undefined, {} as messageComposer.Actions );

    expect(state.loading).toEqual(false);
    expect(state.message).toEqual(null);
  });

  it(`sets loading to true and clears message on  ${messageComposer.MESSAGE_SEND}`, () => {
    const message = {id: 'foo'} as MailMessage;
    const mailbox = 'inbox';

    const action = new messageComposer.MessageSend({message, mailbox});
    const state = messageComposerReducer(undefined, action);

    expect(state.loading).toEqual(true);
    expect(state.message).toEqual(null);
  });

  it(`returns sets loading to false and clears message on ${messageComposer.MESSAGE_SEND_SUCCESS} `, () => {
    const message = {id: 'foo'} as MailMessage;
    const mailbox = 'inbox';

    const action = new messageComposer.MessageSendSuccess({message, mailbox});
    const state = messageComposerReducer(undefined, action);

    expect(state.loading).toEqual(false);
    expect(state.message).toEqual(null);
  });

  it(`returns sets loading to false and retains payload message on ${messageComposer.MESSAGE_SEND_FAILED} `, () => {
    const message = {id: 'foo'} as MailMessage;
    const error = '400';

    const action = new messageComposer.MessageSendFailed({message, error});
    const state = messageComposerReducer(undefined, action);

    expect(state.loading).toEqual(false);
    expect(state.message).toEqual({id: 'foo'} as MailMessage);
  });
});
