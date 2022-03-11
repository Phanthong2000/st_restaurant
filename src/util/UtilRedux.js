import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetUser } from '../redux/actions/userAction';
import {
  actionGetAllFoods,
  actionGetAllTypeFoods,
  actionGetFoodsByName
} from '../redux/actions/foodAction';
import { actionGetAllBooks } from '../redux/actions/orderAction';

function UtilRedux() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      dispatch(actionGetUser(JSON.parse(localStorage.getItem('user')).id));
      dispatch(actionGetAllBooks(JSON.parse(localStorage.getItem('user')).id));
    }
    dispatch(actionGetAllTypeFoods());
    dispatch(actionGetFoodsByName(''));
    return function () {
      return null;
    };
  }, []);
  return null;
}

export default UtilRedux;
