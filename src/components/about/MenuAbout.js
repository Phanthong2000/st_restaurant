import React from 'react';
import { Button, Card, Grid, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import typefood from '../../assets/data/typefood';
import { actionFoodGetTypeChosen } from '../../redux/actions/foodAction';

const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1)
}));
const BoxMenu = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1)
}));
const ImageMenu = styled('img')(({ theme }) => ({
  width: '100%',
  height: '200px',
  borderRadius: '20px',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    height: '300px'
  }
}));
const ButtonWatch = styled(Button)(({ theme }) => ({
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  textTransform: 'none',
  width: '100%',
  marginTop: '30px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
MenuAbout.prototype = { menu: PropTypes.object };
function MenuAbout({ menu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chooseTypeFood = () => {
    typefood.forEach((type) => {
      if (menu.name.toLowerCase().includes(type.name.toLowerCase())) {
        dispatch(actionFoodGetTypeChosen(type));
        navigate('/home/food');
      }
    });
  };
  return (
    <RootStyle xs={6} sm={6} md={6} lg={3} xl={3}>
      <BoxMenu sx={{ '&:hover': { boxShadow: 10 } }}>
        <ImageMenu src={menu.image} />
        <Typography sx={{ fontWeight: 'bold', fontSize: '17px', marginTop: '5px' }}>
          {menu.name}
        </Typography>
        <ButtonWatch onClick={chooseTypeFood}>Xem ngay</ButtonWatch>
      </BoxMenu>
    </RootStyle>
  );
}

export default MenuAbout;
