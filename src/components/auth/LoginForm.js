import React, { useEffect } from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import {} from '@iconify/react';
import { useSelector } from 'react-redux';
import LoginInput from './LoginInput';
import LoginWith from './LoginWith';
import { userJoin } from '../../util/wssConnection';

const RootStyle = styled(Stack)(({ theme }) => ({
  width: '45%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    width: '90%'
  }
}));
const StackLogo = styled(Stack)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  padding: theme.spacing(5, 0)
}));
const Restaurant = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.second,
  fontSize: '20px'
}));
function LoginForm() {
  const me = useSelector((state) => state.socket.me);
  useEffect(() => {
    if (me !== '') {
      userJoin({ socketId: me });
    }
    return function () {
      return null;
    };
  }, [me]);
  return (
    <RootStyle direction="column">
      <StackLogo>
        <Restaurant>ST Restaurant</Restaurant>
      </StackLogo>
      <LoginInput />
      <LoginWith />
    </RootStyle>
  );
}

export default LoginForm;
