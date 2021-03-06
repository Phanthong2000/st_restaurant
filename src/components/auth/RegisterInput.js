import React, { useEffect, useState } from 'react';
import { Box, Stack, styled, InputBase, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../assets/api/api';
import { actionAuthRegister } from '../../redux/actions/authAction';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPasswod] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const goToRegister = () => {
    navigate('/login');
  };
  const register = async () => {
    if (!fullname.match('^[\\u0041-\\u00ff\\u0100-\\u013c\\u01cd-\\u01ce\\s]{2,40}$'))
      setError('H??? t??n kh??ng h???p l???');
    else if (!username.match('^[a-zA-Z0-9]{6,32}$')) {
      setError('T??n ????ng nh???p kh??ng h???p l???');
    } else if (!phone.match('^0[0-9]{9,10}$')) setError('S??? ??i???n tho???i kh??ng h???p l???');
    else if (!password.match('^[a-zA-Z0-9]{6,32}$')) setError('M???t kh???u kh??ng h???p l???');
    else if (password !== rePassword) {
      setError('X??c nh???n m???t kh???u kh??ng tr??ng kh???p');
    } else {
      axios
        .post(`${api}khachHang/create`, {
          anhDaiDien: 'https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg',
          hoTen: fullname,
          soDienThoai: phone,
          gioiTinh: 'Nam',
          taiKhoan: {
            tenDangNhap: username,
            matKhau: password
          }
        })
        .then((res) => {
          setError('');
          navigate('/login');
          dispatch(
            actionAuthRegister({
              content: '????ng k?? t??i kho???n th??nh c??ng',
              type: 'success'
            })
          );
        })
        .catch((err) => {
          setError('T??n ????ng nh???p ???? t???n t???i');
        });
      // axios
      //   .get(`${api}taiKhoan/detail/tenDangNhap/${username}`)
      //   .then((res) => {
      //     setError('T??n ????ng nh???p ???? t???n t???i');
      //   })
      //   .catch((err) => {
      //     axios
      //       .get(`${api}khachHang/detail/soDienThoai`, {
      //         params: {
      //           soDienThoai: phone
      //         }
      //       })
      //       .then((res) => {
      //         setError('S??? ??i???n tho???i ???? t???n t???i');
      //       })
      //       .catch((err) => {
      //         axios.get(`${api}vaiTro/detail/tenVaiTro/CUSTOMER`).then((res) => {
      //           axios
      //             .post(`${api}taiKhoan/create`, {
      //               tenDangNhap: username,
      //               matKhau: password,
      //               trangThai: 'Hi???u l???c',
      //               vaiTro: {
      //                 id: res.data.id
      //               }
      //             })
      //             .then((resTaiKhoan) => {
      //               axios
      //                 .post(`${api}khachHang/create`, {
      //                   anhDaiDien:
      //                     'https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg',
      //                   hoTen: fullname,
      //                   soDienThoai: phone,
      //                   gioiTinh: 'Nam',
      //                   taiKhoan: {
      //                     id: resTaiKhoan.data.id
      //                   }
      //                 })
      //                 .then((res) => {
      //                   navigate('/login');
      //                   dispatch(
      //                     actionAuthRegister({
      //                       content: '????ng k?? t??i kho???n th??nh c??ng',
      //                       type: 'success'
      //                     })
      //                   );
      //                 })
      //                 .catch((err) => {
      //                   console.log('err', err);
      //                 });
      //             })
      //             .catch((err) => {
      //               console.log('err', err);
      //             });
      //         });
      //       });
      //   });
    }
  };
  return (
    <RootStyle>
      <BoxInput>
        <IconInput icon="ant-design:user-outlined" />
        <Input
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="H??? t??n"
        />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:user-outlined" />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="T??n ????ng nh???p"
        />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:phone-outlined" />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="S??? ??i???n tho???i"
        />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:key-outlined" />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPasswod(e.target.value)}
          placeholder="M???t kh???u"
        />
      </BoxInput>
      <BoxInput>
        <IconInput icon="ant-design:key-outlined" />
        <Input
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="X??c nh???n m???t kh???u"
        />
      </BoxInput>
      <Box sx={{ width: '70%', marginTop: '10px' }}>
        <Typography sx={{ color: 'red' }}>{error}</Typography>
      </Box>
      <BoxRegister>
        <ButtonOptions onClick={goToRegister}>????ng nh???p</ButtonOptions>
        <ButtonRegister onClick={register}>????ng k??</ButtonRegister>
      </BoxRegister>
      <Toaster />
    </RootStyle>
  );
}

export default RegisterInput;
