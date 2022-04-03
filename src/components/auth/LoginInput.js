import React, { useEffect, useState } from 'react';
import { Box, Stack, styled, InputBase, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import api from '../../assets/api/api';
import { actionAuthLoggedIn } from '../../redux/actions/authAction';
import { actionGetUser } from '../../redux/actions/userAction';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const showPassword = () => {
    setIsShowPassword(true);
  };
  const hiddenPassword = () => {
    setIsShowPassword(false);
  };
  const goToRegister = () => {
    navigate('/register');
  };
  const login = () => {
    if (!username.match('^[a-zA-Z0-9]{6,32}$')) {
      setError('Tên đăng nhập không hợp lệ');
    } else if (!password.match('^[a-zA-Z0-9]{6,32}$')) setError('Mật khẩu không hợp lệ');
    else {
      axios
        .get(`${api}taiKhoan/detail/tenDangNhap/${username}`)
        .then((res) => {
          if (
            res.data.vaiTro.tenVaiTro === 'CUSTOMER' &&
            res.data.matKhau === password &&
            res.data.trangThai === 'Hiệu lực'
          ) {
            axios
              .get(`${api}khachHang/detail/tenDangNhap/${username}`)
              .then((resKH) => {
                localStorage.setItem('user', JSON.stringify(resKH.data));
                dispatch(actionAuthLoggedIn(true));
                dispatch(actionGetUser(resKH.data.id));
                navigate('/home/app');
              })
              .catch((err) => console.log(err));
          } else if (res.data.trangThai === 'Đã khoá') {
            setError('Tài khoản đã bị khoá');
          } else {
            setError('Tài khoản không tồn tại');
          }
        })
        .catch((err) => {
          setError('Tài khoản không tồn tại');
        });
    }
  };
  return (
    <RootStyle>
      <BoxInput>
        <IconInput icon="ant-design:user-outlined" />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tên đăng nhập"
        />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:key-outlined" />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Mật khẩu"
        />
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
      <Box sx={{ width: '70%', marginTop: '10px' }}>
        <Typography sx={{ color: 'red' }}>{error}</Typography>
      </Box>
      <BoxLogin>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonOptions onClick={goToRegister}>Đăng ký</ButtonOptions>
          <ButtonOptions
            onClick={() => {
              navigate('/forgot-password');
            }}
            sx={{ marginLeft: '15px' }}
          >
            Quên mật khẩu?
          </ButtonOptions>
        </Box>
        <ButtonLogin onClick={login}>Đăng nhập</ButtonLogin>
      </BoxLogin>
    </RootStyle>
  );
}

export default LoginInput;
