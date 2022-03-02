import React, { useState } from 'react';
import { Box, Stack, styled, InputBase, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const RootStyle = styled(Stack)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '70%',
  border: `1px solid ${theme.palette.lightgrey}`,
  padding: theme.spacing(1, 2, 1),
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
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxLogin = styled(Box)(({ theme }) => ({
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
const ButtonLogin = styled(Button)(({ theme }) => ({
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
function LoginInput() {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const showPassword = () => {
    setIsShowPassword(true);
  };
  const hiddenPassword = () => {
    setIsShowPassword(false);
  };
  const goToRegister = () => {
    navigate('/register');
  };
  return (
    <RootStyle>
      <BoxInput>
        <IconInput icon="ant-design:user-outlined" />
        <Input placeholder="Email hoặc số điện thoại" />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:key-outlined" />
        <Input type={isShowPassword ? 'text' : 'password'} placeholder="Mật khẩu" />
        {!isShowPassword ? (
          <IconInput
            onClick={showPassword}
            style={{ cursor: 'pointer' }}
            icon="akar-icons:eye-closed"
          />
        ) : (
          <IconInput
            onClick={hiddenPassword}
            style={{ cursor: 'pointer' }}
            icon="akar-icons:eye-open"
          />
        )}
      </BoxInput>
      <BoxLogin>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonOptions onClick={goToRegister}>Đăng ký</ButtonOptions>
          <ButtonOptions sx={{ marginLeft: '15px' }}>Quên mật khẩu?</ButtonOptions>
        </Box>
        <ButtonLogin>Đăng nhập</ButtonLogin>
      </BoxLogin>
    </RootStyle>
  );
}

export default LoginInput;
