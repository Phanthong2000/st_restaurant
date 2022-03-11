import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_ORDER_GET_ORDER,
  ACTION_ORDER_ADD_FOODS,
  ACTION_ORDER_EDIT_FOODS,
  ACTION_ORDER_DELETE_FOODS,
  ACTION_ORDER_MODAL_INFORMATION_FOOD,
  ACTION_ORDER_SET_FOODS,
  ACTION_ORDER_GET_ALL_BOOKS
} from './types';

export const actionOrderGetOrder = (data) => ({
  type: ACTION_ORDER_GET_ORDER,
  payload: data
});
export const actionOrderAddFoods = (data) => ({
  type: ACTION_ORDER_ADD_FOODS,
  payload: data
});
export const actionOrderEditFoods = (data) => ({
  type: ACTION_ORDER_EDIT_FOODS,
  payload: data
});
export const actionOrderDeleteFoods = (data) => ({
  type: ACTION_ORDER_DELETE_FOODS,
  payload: data
});
export const actionOrderSetFoods = (data) => ({
  type: ACTION_ORDER_SET_FOODS,
  payload: data
});
export const actionOrderModalInformation = (data) => ({
  type: ACTION_ORDER_MODAL_INFORMATION_FOOD,
  payload: data
});
export const actionOrderGetAllBooks = (data) => ({
  type: ACTION_ORDER_GET_ALL_BOOKS,
  payload: data
});
export const actionGetAllBooks = (id) => (dispatch) => {
  axios
    .get(`${api}donDatBan/list/maKhachHang`, {
      params: {
        maKhachHang: id
      }
    })
    .then((res) => {
      // res.data.sort((a,b) => Date.parse(b.created) - Date)
      dispatch(actionOrderGetAllBooks(res.data));
    })
    .catch((err) => console.log(err));
};
