import { ACTION_AUTH_REGISTER, ACTION_AUTH_LOGGED_IN } from './types';

export const actionAuthRegister = (data) => ({
  type: ACTION_AUTH_REGISTER,
  payload: data
});
export const actionAuthLoggedIn = (data) => ({
  type: ACTION_AUTH_LOGGED_IN,
  payload: data
});
