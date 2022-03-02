import React, { useState } from 'react';
import { Box, Stack, styled, InputBase, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const RootStyle = styled(Stack)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '70%',
  border: `1px solid ${theme.palette.lightgrey}`,
  padding: theme.spacing(0.5, 2, 0.5),
  borderRadius: '10px',
  alignItems: 'center',
  display: 'flex',
  marginTop: 15
}));
const IconInput = styled(Icon)(({ theme }) => ({
  width: '20px',
  height: '20px'
}));
const Input = styled(InputBase)(({ theme }) => ({
  width: '100%',
  margin: ' 0px 20px',
  fontSize: '13px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxRegister = styled(Box)(({ theme }) => ({
  width: '70%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '20px'
}));
const ButtonOptions = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  color: theme.palette.gray,
  fontFamily: theme.typography.fontFamily.second,
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline'
  }
}));
const ButtonRegister = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  color: theme.palette.white,
  background: theme.palette.main,
  fontFamily: theme.typography.fontFamily.second,
  textTransform: 'none',
  fontSize: '15px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function RegisterInput() {
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate('/login');
  };
  return (
    <RootStyle>
      <BoxInput>
        <IconInput icon="ant-design:user-outlined" />
        <Input placeholder="Họ và tên" />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:phone-outlined" />
        <Input placeholder="Số điện thoại" />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:key-outlined" />
        <Input placeholder="Mật khẩu" />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:key-outlined" />
        <Input placeholder="Xác nhận mật khẩu" />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ic:outline-email" />
        <Input placeholder="Email" />
      </BoxInput>
      <BoxRegister>
        <ButtonOptions onClick={goToRegister}>Đăng nhập</ButtonOptions>
        <ButtonRegister>Đăng ký</ButtonRegister>
      </BoxRegister>
    </RootStyle>
  );
}

export default RegisterInput;
