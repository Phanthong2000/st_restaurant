import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  styled,
  TextField,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2)
}));
const BoxDetail = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: theme.spacing(2),
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '25%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '80%',
  marginLeft: '10%',
  marginBottom: '15px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: '0px'
  }
}));
const Input = styled(TextField)(({ theme }) => ({
  width: '100%'
}));
const AvatarUser = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '40%',
    height: '40%',
    marginLeft: '30%'
  }
}));
const ButtonChangeAvatar = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  marginTop: '20px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const ButtonSaveChangeChange = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  marginTop: '20px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function Detail() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (loggedIn) {
      setFullName(user.hoTen);
      setAvatar(user.anhDaiDien);
      setPhone(user.soDienThoai);
      setEmail(user.email);
      setAddress(user.diaChi);
      setGender(user.gioiTinh);
      setBirthday(user.ngaySinh);
    }
    return function () {
      return null;
    };
  }, [user]);
  return (
    <RootStyle>
      <BoxDetail>
        <BoxTitle>
          <Title>Thông tin khách hàng</Title>
          <Box sx={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
            <AvatarUser src={avatar} />
            <ButtonChangeAvatar>Đổi ảnh đại diện</ButtonChangeAvatar>
          </Box>
        </BoxTitle>
        <BoxContent>
          <BoxInput>
            <Input
              disabled
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Họ tên"
            />
          </BoxInput>
          <BoxInput>
            <Input
              disabled
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="Số điện thoại"
            />
          </BoxInput>
          <BoxInput>
            <Input
              disabled
              fullWidth
              value={email}
              onChange={(e) => setPhone(e.target.value)}
              label="Email"
            />
          </BoxInput>
          <BoxInput>
            <Input
              disabled
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Địa chỉ"
            />
          </BoxInput>
          <BoxInput>
            <Input
              disabled
              fullWidth
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              label="Ngày sinh"
            />
          </BoxInput>
          <BoxInput>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  value="Nam"
                  control={<Radio onClick={() => setGender('Nam')} checked={gender === 'Nam'} />}
                  label="Nam"
                />
                <FormControlLabel
                  value="Nữ"
                  control={<Radio onClick={() => setGender('Nữ')} checked={gender === 'Nữ'} />}
                  label="Nữ"
                />
              </RadioGroup>
            </FormControl>
          </BoxInput>
          <BoxInput>
            <ButtonSaveChangeChange>Lưu</ButtonSaveChangeChange>
          </BoxInput>
        </BoxContent>
      </BoxDetail>
    </RootStyle>
  );
}

export default Detail;
