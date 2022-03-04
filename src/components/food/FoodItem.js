import React from 'react';
import { Box, Button, Card, Grid, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2)
}));
const BoxFood = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.lightgrey,
  padding: theme.spacing(1)
}));
const AvatarFood = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: '20px',
  height: '300px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    height: '200px'
  }
}));
const BoxNamePrice = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const NameFood = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  margin: '10px'
}));
const PriceFood = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.main,
  fontWeight: 'bold',
  marginRight: '20px'
}));
const ButtonSeeInformation = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.second,
  marginTop: '20px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
FoodItem.prototype = {
  food: PropTypes.object
};
function FoodItem({ food }) {
  const navigate = useNavigate();
  const checkDescriptionLength = () => {
    if (food.description.length < 200) return `${food.description}`;
    return `${food.description.substring(0, 200)}...`;
  };
  const goToFoodDetail = () => {
    navigate(`/home/food-detail/${food.id}`);
  };
  return (
    <RootStyle data-aos="zoom-in" item xs={12} sm={6} md={6} lg={4} xl={4}>
      <BoxFood sx={{ '&:hover': { boxShadow: 20 } }}>
        <AvatarFood onClick={goToFoodDetail} src={food.images.at(0)} />
        <BoxNamePrice>
          <NameFood>{food.name}</NameFood>
          <PriceFood>
            <b style={{ fontSize: '20px', color: '#000' }}>Giá: </b>
            {`${food.price.toLocaleString('es-US')} vnđ`}
          </PriceFood>
        </BoxNamePrice>
        <Typography maxHeight="120px">{checkDescriptionLength()}</Typography>
        <ButtonSeeInformation onClick={goToFoodDetail}>Xem thông tin</ButtonSeeInformation>
      </BoxFood>
    </RootStyle>
  );
}

export default FoodItem;
