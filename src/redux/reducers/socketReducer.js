import {
  ACTION_SOCKET_GET_SOCKET,
  ACTION_SOCKET_ME,
  ACTION_SOCKET_BROADCAST_SOCKET
} from '../actions/types';

const defaultState = {
  socket: {},
  me: '',
  broadcast: []
};

// eslint-disable-next-line default-param-last
const socketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_SOCKET_GET_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    case ACTION_SOCKET_ME:
      return {
        ...state,
        me: action.payload
      };
    case ACTION_SOCKET_BROADCAST_SOCKET:
      return {
        ...state,
        broadcast: action.payload
      };
    default:
      return state;
  }
};

export default socketReducer;
