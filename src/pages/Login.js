import React from 'react';
import { Box, styled } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import AuthSlide from '../components/auth/AuthSlide';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.lightgrey,
  height: heightScreen,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '70%',
  height: '80%',
  display: 'flex',
  justifyContent: 'center',
  background: theme.palette.white,
  borderRadius: '20px',
  [theme.breakpoints.down('md')]: {
    width: '95%'
  }
}));
function Login() {
  return (
    <RootStyle>
      <BoxContent>
        <LoginForm />
        <AuthSlide />
      </BoxContent>
    </RootStyle>
  );
}

export default Login;
