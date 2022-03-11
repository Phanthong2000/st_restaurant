import { Box, Divider, Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import foods from '../../assets/data/foods';
import FoodItem from './FoodItem';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: '10px'
}));
const Separate = styled(Divider)(({ theme }) => ({
  width: '50%',
  marginLeft: '25%',
  color: theme.palette.background,
  marginTop: '20px',
  fontSize: '20px',
  fontWeight: 'bold'
}));
const GridFood = styled(Grid)(() => ({
  width: '100%'
}));
BoxTypeFood.prototype = {
  type: PropTypes.object
};
function BoxTypeFood({ type }) {
  const [allFoods, setAllFoods] = useState([]);
  const foods = useSelector((state) => state.food.foodsByName);
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const getAllFoodsByType = () => {
    const data = [];
    foods.forEach((food) => {
      if (food.loaiMonAn.id === type.id && food.trangThai === 'Đang bán') data.push(food);
    });
    setAllFoods(data);
  };
  useEffect(() => {
    getAllFoodsByType();
    return function () {
      return null;
    };
  }, [typeChosen, foods]);
  return (
    <RootStyle>
      <Separate>{typeChosen.name === 'all' ? type.tenLoaiMonAn : type.name}</Separate>
      <GridFood container>
        {allFoods.map((item, index) => (
          <FoodItem key={index} food={item} />
        ))}
      </GridFood>
    </RootStyle>
  );
}

export default BoxTypeFood;
