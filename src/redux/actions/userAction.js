import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_USER_OPEN_CHAT_BOX,
  ACTION_USER_SHOW_HOT_TOAST,
  ACTION_USER_GET_USER
} from './types';

export const actionUserGetUser = (data) => ({
  type: ACTION_USER_GET_USER,
  payload: data
});
export const actionUserOpenChatBox = (data) => ({
  type: ACTION_USER_OPEN_CHAT_BOX,
  payload: data
});
export const actionUserShowHotToast = (data) => ({
  type: ACTION_USER_SHOW_HOT_TOAST,
  payload: data
});

export const actionGetUser = (id) => (dispatch) => {
  console.log('s');
  axios
    .get(`${api}khachHang/detail/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch(actionUserGetUser(res.data));
    })
    .catch((error) => console.log(error));
};
