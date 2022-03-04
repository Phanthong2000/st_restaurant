import React from 'react';
import { Button, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { actionFoodGetTypeChosen } from '../../redux/actions/foodAction';

const RootStyle = styled(Button)(({ theme }) => ({
  marginLeft: '10px',
  background: theme.palette.white,
  color: theme.palette.black,
  textTransform: 'none',
  width: '100px',
  fontSize: '12px',
  ':hover': {
    background: theme.palette.mainHover
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
TypeFoodItem.prototype = {
  type: PropTypes.object
};
function TypeFoodItem({ type }) {
  const dispatch = useDispatch();
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const chooseType = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: type.id,
        name: type.name
      })
    );
  };
  return (
    <RootStyle
      sx={typeChosen.name === type.name && { background: '#3C58C9', color: '#fff' }}
      onClick={chooseType}
    >
      {type.name}
    </RootStyle>
  );
}

export default TypeFoodItem;
