import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_FOOD_GET_TYPE_CHOSEN,
  ACTION_FOOD_GET_ALL_FOODS,
  ACTION_FOOD_GET_ALL_TYPE_FOODS,
  ACTION_FOOD_GET_ALL_FOODS_BY_NAME
} from './types';

export const actionFoodGetTypeChosen = (data) => ({
  type: ACTION_FOOD_GET_TYPE_CHOSEN,
  payload: data
});
export const actionFoodGetAllFoods = (data) => ({
  type: ACTION_FOOD_GET_ALL_FOODS,
  payload: data
});

export const actionFoodGetAllTypeFoods = (data) => ({
  type: ACTION_FOOD_GET_ALL_TYPE_FOODS,
  payload: data
});

export const actionGetAllFoods = () => (dispatch) => {
  axios
    .get(`${api}monAn/list`)
    .then((res) => {
      const { data } = res;
      const foods = [];
      data.forEach((food) => {
        if (food.trangThai === 'Đang bán') {
          foods.push(food);
        }
      });
      const foodsSort = foods.sort((a, b) => b.donGia - a.donGia);
      dispatch(actionFoodGetAllFoods(foodsSort));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const actionGetAllTypeFoods = () => (dispatch) => {
  axios
    .get(`${api}loaiMonAn/list`)
    .then((res) => {
      dispatch(actionFoodGetAllTypeFoods(res.data));
    })
    .catch((err) => console.log(err));
};

export const actionFoodGetFoodsByName = (data) => ({
  type: ACTION_FOOD_GET_ALL_FOODS_BY_NAME,
  payload: data
});
export const actionGetFoodsByName = (name) => (dispatch) => {
  if (name === '') {
    axios
      .get(`${api}monAn/list`)
      .then((res) => {
        dispatch(actionFoodGetFoodsByName(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .get(`${api}monAn/list/tenMonAn`, {
        params: {
          tenMonAn: name
        }
      })
      .then((res) => {
        dispatch(actionFoodGetFoodsByName(res.data));
      })
      .catch((err) => console.log(err));
  }
};
