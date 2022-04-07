import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Box, styled, Typography } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import AuthSlide from '../components/auth/AuthSlide';
import { actionAuthRegister } from '../redux/actions/authAction';

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
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const register = useSelector((state) => state.auth.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () =>
    toast.success(
      <Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{register.content}</Typography>
      </Box>
    );
  useEffect(() => {
    if (loggedIn) navigate('/home/app');
    if (register.content !== '') {
      notify();
    }
    return function () {
      return null;
    };
  }, [register]);
  return (
    <RootStyle>
      <BoxContent>
        <LoginForm />
        <AuthSlide />
      </BoxContent>
      <Toaster position="top-left" />
    </RootStyle>
  );
}

export default Login;
