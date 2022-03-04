import { Icon } from '@iconify/react';
import { Box, Button, Card, InputBase, styled, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import typefood from '../assets/data/typefood';
import TypeFoodItem from '../components/food/TypeFoodItem';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';
import { actionFoodGetTypeChosen } from '../redux/actions/foodAction';
import BoxTypeFood from '../components/food/BoxTypeFood';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '120px',
  background: theme.palette.background
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '60%',
  background: theme.palette.white,
  margin: '10px 20%',
  padding: theme.spacing(0.5, 0.5, 0.5, 2),
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    marginLeft: '10%'
  }
}));
const InputSearch = styled(InputBase)(({ theme }) => ({
  fontSize: '16px'
}));
const BoxIconSearch = styled(Box)(({ theme }) => ({
  background: theme.palette.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5, 2),
  borderRadius: '10px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxSort = styled(Card)(({ theme }) => ({
  width: '60%',
  margin: '20px 20%',
  background: theme.palette.gray,
  display: 'flex',
  padding: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    marginLeft: '5%',
    display: 'block'
  }
}));
const ButtonSortPrice = styled(Button)(({ theme }) => ({
  width: '100px',
  fontSize: '12px',
  marginLeft: '10px',
  background: theme.palette.white,
  color: theme.palette.black,
  textTransform: 'none',
  ':hover': {
    background: theme.palette.mainHover
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
const BoxAllFood = styled(Box)(({ theme }) => ({
  width: '90%',
  margin: '20px 5%'
}));
function Food() {
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const dispatch = useDispatch();
  const chooseTypeAll = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: '',
        name: 'all'
      })
    );
  };
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Món ăn" />
      <BoxSearch>
        <InputSearch fullWidth placeholder="Tìm kiếm món ăn" />
        <BoxIconSearch>
          <Icon
            style={{ color: '#fff', width: '30px', height: '30px' }}
            icon="ant-design:search-outlined"
          />
        </BoxIconSearch>
      </BoxSearch>
      <BoxSort elevation={3}>
        <Typography sx={{ color: '#fff', fontSize: '16px' }}>Sắp xếp theo</Typography>
        <ButtonSortPrice
          onClick={chooseTypeAll}
          sx={typeChosen.name === 'all' && { background: '#3C58C9', color: '#fff' }}
        >
          Tất cả
        </ButtonSortPrice>
        {typefood.map((item, index) => (
          <TypeFoodItem key={index} type={item} />
        ))}
        <ButtonSortPrice>Giá</ButtonSortPrice>
      </BoxSort>
      <BoxAllFood>
        {typeChosen.name === 'all' ? (
          <>
            {typefood.map((item, index) => (
              <BoxTypeFood key={index} type={item} />
            ))}
          </>
        ) : (
          <BoxTypeFood type={typeChosen} />
        )}
      </BoxAllFood>
    </RootStyle>
  );
}

export default Food;
