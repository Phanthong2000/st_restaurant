import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase-config';
import api from '../../assets/api/api';
import { actionAuthLoggedIn } from '../../redux/actions/authAction';
import { actionGetUser } from '../../redux/actions/userAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '70%',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const TitleLoginWith = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.second,
  color: theme.palette.gray
}));
const ButtonLoginWith = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.second,
  color: theme.palette.main,
  cursor: 'pointer',
  marginLeft: '20px',
  ':hover': {
    textDecoration: 'underline'
  }
}));
function LoginWith() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        console.log('cc', user);
        const customer = {
          anhDaiDien: user.photoURL,
          hoTen: user.displayName,
          soDienThoai: user.phoneNumber,
          gioiTinh: 'Nam',
          email: user.email,
          taiKhoan: {
            tenDangNhap: user.uid,
            matKhau: user.uid
          }
        };
        axios
          .post(`${api}auth/login`, {
            username: user.uid,
            password: user.uid
          })
          .then((res) => {
            console.log('res', res.data);
            localStorage.setItem('token', JSON.stringify(res.data.accessToken));
            axios
              .get(`${api}khachHang/detail/tenDangNhap/${user.uid}`, {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`
                }
              })
              .then((resKH) => {
                localStorage.setItem('user', JSON.stringify(resKH.data));
                dispatch(actionAuthLoggedIn(true));
                dispatch(actionGetUser(resKH.data.id));
                window.location.reload();
                navigate('/home/app');
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            axios
              .post(`${api}khachHang/create`, {
                ...customer
              })
              .then((res) => {
                axios
                  .post(`${api}auth/login`, {
                    username: user.uid,
                    password: user.uid
                  })
                  .then((res) => {
                    localStorage.setItem('token', JSON.stringify(res.data.accessToken));
                    axios
                      .get(`${api}khachHang/detail/tenDangNhap/${user.uid}`, {
                        headers: {
                          Authorization: `Bearer ${res.data.accessToken}`
                        }
                      })
                      .then((resKH) => {
                        localStorage.setItem('user', JSON.stringify(resKH.data));
                        dispatch(actionAuthLoggedIn(true));
                        dispatch(actionGetUser(resKH.data.id));
                        window.location.reload();
                        navigate('/home/app');
                      })
                      .catch((err) => console.log(err));
                  });
              });
          });
      })
      .catch((err) => console.log(err));
  };
  const handleLoginGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        const customer = {
          anhDaiDien: user.photoURL,
          hoTen: user.displayName,
          soDienThoai: user.phoneNumber,
          gioiTinh: 'Nam',
          email: user.email,
          taiKhoan: {
            tenDangNhap: user.email,
            matKhau: user.uid
          }
        };
        axios
          .post(`${api}auth/login`, {
            username: user.email,
            password: user.uid
          })
          .then((res) => {
            localStorage.setItem('token', JSON.stringify(res.data.accessToken));
            axios
              .get(`${api}khachHang/detail/tenDangNhap/${user.email}`, {
                headers: {
                  Authorization: `Bearer ${res.data.accessToken}`
                }
              })
              .then((resKH) => {
                localStorage.setItem('user', JSON.stringify(resKH.data));
                dispatch(actionAuthLoggedIn(true));
                dispatch(actionGetUser(resKH.data.id));
                window.location.reload();
                navigate('/home/app');
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            axios
              .post(`${api}khachHang/create`, {
                ...customer
              })
              .then((res) => {
                axios
                  .post(`${api}auth/login`, {
                    username: user.email,
                    password: user.uid
                  })
                  .then((res) => {
                    localStorage.setItem('token', JSON.stringify(res.data.accessToken));
                    axios
                      .get(`${api}khachHang/detail/tenDangNhap/${user.email}`, {
                        headers: {
                          Authorization: `Bearer ${res.data.accessToken}`
                        }
                      })
                      .then((resKH) => {
                        localStorage.setItem('user', JSON.stringify(resKH.data));
                        dispatch(actionAuthLoggedIn(true));
                        dispatch(actionGetUser(resKH.data.id));
                        window.location.reload();
                        navigate('/home/app');
                      })
                      .catch((err) => console.log(err));
                  });
              });
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <RootStyle>
      <TitleLoginWith>Đăng nhập bằng</TitleLoginWith>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonLoginWith onClick={handleLoginFacebook}>facebook</ButtonLoginWith>
        <ButtonLoginWith onClick={handleLoginGoogle}>google</ButtonLoginWith>
      </Box>
    </RootStyle>
  );
}

export default LoginWith;
