import React from 'react';
import { Box, Button, InputBase, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: `${heightScreen}px`,
  background: theme.palette.lightgrey,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '500px',
  height: '300px',
  background: '#fff',
  borderRadius: '20px',
  padding: theme.spacing(2),
  textAlign: 'center'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '80%',
  border: `1px solid ${theme.palette.lightgrey}`,
  padding: theme.spacing(1, 2, 1),
  borderRadius: '10px',
  alignItems: 'center',
  display: 'flex',
  marginTop: '50px',
  marginLeft: '10%'
}));
const IconInput = styled(Icon)(({ theme }) => ({
  width: '20px',
  height: '20px'
}));
const Input = styled(InputBase)(({ theme }) => ({
  width: '100%',
  margin: ' 0px 20px',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const ButtonNext = styled(Button)(({ theme }) => ({
  width: '80%',
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  margin: '20px 10% 0px 10%',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const ButtonBack = styled(Button)(({ theme }) => ({
  width: '80%',
  textTransform: 'none',
  background: theme.palette.gray,
  color: theme.palette.white,
  margin: '20px 10% 0px 10%',
  ':hover': {
    background: theme.palette.lightgrey
  }
}));
function ForgetPassword() {
  return (
    <RootStyle>
      <BoxContent>
        <Title>Quên mật khẩu</Title>
        <BoxInput>
          <IconInput icon="ant-design:phone-outlined" />
          <Input fullWidth type="text" placeholder="Số điện thoại" />
        </BoxInput>
        <ButtonNext>Tiếp tục</ButtonNext>
        <ButtonBack>Quay lại</ButtonBack>
      </BoxContent>
    </RootStyle>
  );
}

export default ForgetPassword;
