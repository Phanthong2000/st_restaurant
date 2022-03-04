import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import foods from '../assets/data/foods';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '120px',
  background: theme.palette.background
}));
const BoxBreadcrumbs = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 10),
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.background
}));
const BreadcrumbsPage = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.white,
  fontSize: '14px',
  marginRight: '5px'
}));
const BoxDetail = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 10),
  display: 'flex',
  justifyContent: 'space-between',
  background: theme.palette.white,
  [theme.breakpoints.down('md')]: {
    display: 'block',
    padding: theme.spacing(1, 5)
  }
}));
const BoxLeft = styled(Box)(({ theme }) => ({
  width: '50%',
  background: theme.palette.white,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const BoxRight = styled(Stack)(({ theme }) => ({
  width: '45%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const AvatarFood = styled('img')(({ theme }) => ({
  width: '100%',
  height: '450px',
  borderRadius: '20px',
  [theme.breakpoints.down('sm')]: {
    height: '300px'
  }
}));
const BoxImages = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center'
}));
const ImageSmall = styled('img')(({ theme }) => ({
  width: '70px',
  height: '70px',
  marginRight: '10px',
  cursor: 'pointer',
  borderRadius: '10px'
}));
const NameFood = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '30px',
  fontFamily: theme.typography.fontFamily.primary
}));
const PriceFood = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  fontWeight: 'bold',
  color: theme.palette.main,
  marginTop: '20px'
}));
const BoxDescription = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  marginTop: '20px'
}));
const ButtonOrder = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '16px',
  fontWeight: 'bold',
  width: '50%',
  marginLeft: '25%'
}));
function FoodDetail() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();
  const getFoodById = () => {
    foods.forEach((item) => {
      if (`${item.id}` === id) {
        setFood(item);
        setAvatar(item.images.at(0));
      }
    });
  };
  useEffect(() => {
    getFoodById();
    return function () {
      return null;
    };
  }, []);
  const goToHome = () => {
    navigate('/home/app');
  };
  const goToFood = () => {
    navigate('/home/food');
  };
  const goToOrder = () => {
    navigate('/home/order');
  };
  if (food.id === undefined) return null;
  return (
    <RootStyle>
      <BoxBreadcrumbs>
        <BreadcrumbsPage onClick={goToHome} sx={{ cursor: 'pointer' }}>
          Trang chủ
        </BreadcrumbsPage>
        <BreadcrumbsPage>/</BreadcrumbsPage>
        <BreadcrumbsPage sx={{ cursor: 'pointer' }} onClick={goToFood}>
          Món ăn
        </BreadcrumbsPage>
        <BreadcrumbsPage>/</BreadcrumbsPage>
        <BreadcrumbsPage>{food.name}</BreadcrumbsPage>
      </BoxBreadcrumbs>
      <BoxDetail>
        <BoxLeft>
          <AvatarFood src={avatar} />
          <BoxImages>
            {food.images.map((item, index) => (
              <ImageSmall
                onMouseEnter={() => setAvatar(item)}
                sx={{ outline: item === avatar && `5px solid #3C58C9` }}
                key={index}
                src={item}
              />
            ))}
          </BoxImages>
        </BoxLeft>
        <BoxRight>
          <Box>
            <NameFood>{food.name}</NameFood>
            <PriceFood>{`${food.price.toLocaleString('es-US')} vnđ`}</PriceFood>
            <BoxDescription>
              <Typography
                sx={{ color: 'gray', fontSize: '16px', width: '20%', fontWeight: 'bold' }}
              >
                Mô tả
              </Typography>
              <Typography sx={{ fontSize: '14px', fontFamily: 'sans-serif', width: '80%' }}>
                {food.description}
              </Typography>
            </BoxDescription>
          </Box>
          <ButtonOrder onClick={goToOrder}>Đặt bàn</ButtonOrder>
        </BoxRight>
      </BoxDetail>
    </RootStyle>
  );
}

export default FoodDetail;
