import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetUser } from '../redux/actions/userAction';
import {
  actionGetAllFoods,
  actionGetAllTypeFoods,
  actionGetFoodsByName
} from '../redux/actions/foodAction';
import { actionGetAllBooks } from '../redux/actions/orderAction';
import { actionGetAllAreas, actionGetAllTables } from '../redux/actions/areaAction';
import { actionGetAllNews } from '../redux/actions/newsAction';

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
    dispatch(actionGetAllAreas());
    dispatch(actionGetAllTables());
    dispatch(actionGetAllNews());
    return function () {
      return null;
    };
  }, []);
  return null;
}

export default UtilRedux;
