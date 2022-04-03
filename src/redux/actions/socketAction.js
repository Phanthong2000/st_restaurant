import {
  ACTION_SOCKET_GET_SOCKET,
  ACTION_SOCKET_ME,
  ACTION_SOCKET_BROADCAST_SOCKET
} from './types';

export const actionSocketGetSocket = (data) => ({
  type: ACTION_SOCKET_GET_SOCKET,
  payload: data
});

export const actionSocketMe = (data) => ({
  type: ACTION_SOCKET_ME,
  payload: data
});

export const actionSocketBroadcastSocket = (data) => ({
  type: ACTION_SOCKET_BROADCAST_SOCKET,
  payload: data
});
