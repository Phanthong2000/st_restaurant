import React from 'react';
import { Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '55%',
  height: '100%',
  backgroundImage: `url(https://www.discoverlosangeles.com/sites/default/files/images/2019-01/laxbw-prime-1715-hor-wide.jpg?width=1600&height=1200&fit=crop&quality=78&auto=webp)`,
  borderRadius: '0px 20px 20px 0px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));
const ButtonGoHome = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily,
  background: theme.palette.white,
  color: theme.palette.main,
  ':hover': {
    background: theme.palette.white
  }
}));
function AuthSlide() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/home/app');
  };
  return (
    <RootStyle>
      <ButtonGoHome onClick={goToHome}>Về trang chủ</ButtonGoHome>
    </RootStyle>
  );
}

export default AuthSlide;
