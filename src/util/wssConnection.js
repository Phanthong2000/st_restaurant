import { io } from 'socket.io-client';
import {
  actionSocketGetSocket,
  actionSocketMe,
  actionSocketBroadcastSocket
} from '../redux/actions/socketAction';
import store from '../redux/store';

let socket;
export const connectWithSocket = () => {
  const { loggedIn } = store.getState().auth;
  socket = io('http://localhost:3001/');
  store.dispatch(actionSocketGetSocket(socket));
  if (loggedIn)
    socket.on('broadcast', (data) => {
      store.dispatch(actionSocketBroadcastSocket(data));
    });
  socket.on('me', (id) => {
    console.log(id);
    store.dispatch(actionSocketMe(id));
  });
};
export const registerUser = (data) => {
  socket.emit('register-new-user', data);
};
export const userJoin = (data) => {
  socket.emit('user-join', data);
};
export const sendFeedbackSocket = (data) => {
  socket.emit('send-feedback', data);
};
export const sendBookSocket = (data) => {
  socket.emit('send-book', data);
};
export const logoutSocket = () => {
  socket.disconnect();
};
