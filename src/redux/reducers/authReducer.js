import { ACTION_AUTH_REGISTER, ACTION_AUTH_LOGGED_IN } from '../actions/types';

const defaultState = {
  loggedIn: localStorage.getItem('user') !== null,
  register: {
    content: '',
    type: ''
  }
};

// eslint-disable-next-line default-param-last
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_AUTH_REGISTER:
      return {
        ...state,
        register: action.payload
      };
    case ACTION_AUTH_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
