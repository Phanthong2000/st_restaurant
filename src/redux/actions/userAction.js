import { ACTION_USER_OPEN_CHAT_BOX, ACTION_USER_SHOW_HOT_TOAST } from './types';

export const actionUserOpenChatBox = (data) => ({
  type: ACTION_USER_OPEN_CHAT_BOX,
  payload: data
});
export const actionUserShowHotToast = (data) => ({
  type: ACTION_USER_SHOW_HOT_TOAST,
  payload: data
});
