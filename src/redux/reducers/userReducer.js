import { ACTION_USER_OPEN_CHAT_BOX } from '../actions/types';

const defaultState = {
  openChatBox: false
};

// eslint-disable-next-line default-param-last
const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_USER_OPEN_CHAT_BOX:
      return {
        ...state,
        openChatBox: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
