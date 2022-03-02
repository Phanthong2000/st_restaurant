import React from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import {} from '@iconify/react';
import RegisterInput from './RegisterInput';

const RootStyle = styled(Stack)(({ theme }) => ({
  width: '45%',
  height: '100%',
  alignItems: 'center',
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
function RegisterForm() {
  return (
    <RootStyle direction="column">
      <StackLogo>
        <Restaurant>ST Restaurant</Restaurant>
      </StackLogo>
      <RegisterInput />
    </RootStyle>
  );
}

export default RegisterForm;
