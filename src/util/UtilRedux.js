import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetUser } from '../redux/actions/userAction';
import { actionGetAllFoods, actionGetAllTypeFoods } from '../redux/actions/foodAction';

function UtilRedux() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      dispatch(actionGetUser(JSON.parse(localStorage.getItem('user')).id));
    }
    dispatch(actionGetAllTypeFoods());
    dispatch(actionGetAllFoods());
    return function () {
      return null;
    };
  }, []);
  return null;
}

export default UtilRedux;
