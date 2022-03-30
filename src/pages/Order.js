import {
  Autocomplete,
  Box,
  Button,
  Card,
  Input,
  InputBase,
  styled,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';
import backgroundOrder from '../assets/images/backgroundOrder.png';
import { actionOrderGetOrder } from '../redux/actions/orderAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '120px',
  background: theme.palette.background
}));
const BoxOrder = styled(Box)(({ theme }) => ({
  width: '600px',
  backgroundImage: `url(${backgroundOrder})`,
  height: '800px',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: '80px 100px',
  [theme.breakpoints.down('sm')]: {
    padding: '80px 50px'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: 'serif',
  fontSize: '40px'
}));
const InputWapper = styled(Box)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderRadius: '20px',
  marginTop: '10px'
}));
const InputInfo = styled(Input)(({ theme }) => ({
  fontSize: '16px',
  width: '100%'
}));
const ButtonOrder = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: theme.spacing(1, 5),
  color: theme.palette.black,
  background: theme.palette.white,
  fontSize: '14px',
  fontWeight: 'bold',
  borderRadius: '20px',
  border: `1px solid ${theme.palette.black}`,
  ':hover': {
    color: theme.palette.white,
    background: theme.palette.black
  }
}));
const options = [
  { label: '30p', time: 30 },
  { label: '1h', time: 60 },
  { label: '1h 30p', time: 90 },
  { label: '2h', time: 120 },
  { label: '2h 30p', time: 150 },
  { label: '3h', time: 180 },
  { label: '3h 30p', time: 210 }
];
function Order() {
  const [dateUse, setDateUse] = useState(new Date());
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantityCustomer, setQuantityCustomer] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(options.at(0));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!loggedIn) navigate('/login');
    else {
      setFullName(user.hoTen);
      setEmail(user.email);
      setPhone(user.soDienThoai);
    }
    return function () {
      return null;
    };
  }, [user]);
  const order = () => {
    if (dateUse.getTime() <= new Date().getTime()) setError('Ngày tháng, giờ phải sau hiện tại');
    else if (!validator.isNumeric(quantityCustomer) || parseInt(quantityCustomer, 10) <= 0)
      setError('Số khách phải lớn hơn 0');
    else {
      setError('');
      dispatch(
        actionOrderGetOrder({
          customerName: fullName,
          email,
          phone,
          date: dateUse,
          quantityCustomer: parseInt(quantityCustomer, 10),
          timeUse: time,
          description
        })
      );
      navigate('/home/order-choose-food');
    }
  };
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Đặt bàn" />
      <Box sx={{ background: '#fff', display: 'flex', justifyContent: 'center' }}>
        <BoxOrder>
          <BoxInput>
            <Title>Đặt bàn</Title>
            <InputWapper>
              <Typography sx={{ fontSize: '16px' }}>Họ tên:</Typography>
              <InputInfo
                disabled
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
                placeholder="Aa"
              />
            </InputWapper>
            <InputWapper>
              <Typography sx={{ fontSize: '16px' }}>Email:</Typography>
              <InputInfo
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                placeholder="Aa"
              />
            </InputWapper>
            <InputWapper>
              <Typography sx={{ fontSize: '16px' }}>Số điện thoại:</Typography>
              <InputInfo
                disabled
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                placeholder="0123456789"
              />
            </InputWapper>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Thời gian nhận bàn</Typography>
                <DatePicker
                  customInput={<InputInfo fullWidth />}
                  selected={dateUse}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy, hh:mm a"
                  onChange={(newValue) => {
                    setDateUse(newValue);
                  }}
                />
              </InputWapper>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Số khách:</Typography>
                <InputInfo
                  value={quantityCustomer}
                  onChange={(e) => setQuantityCustomer(e.target.value)}
                  fullWidth
                  placeholder="0"
                />
              </InputWapper>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng:</Typography>
                <Autocomplete
                  value={time}
                  disableClearable
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setTime(newValue);
                  }}
                  sx={{ zIndex: 4 }}
                  getOptionLabel={(option) => option.label}
                  options={options}
                  renderOption={(params, option) => (
                    <Box sx={{ background: '#fff' }} {...params}>
                      {option.label}
                    </Box>
                  )}
                  disablePortal
                  id="combo-box-demo"
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      error={error === 'Vui lòng chọn loại món ăn'}
                      sx={{ color: '#fff' }}
                      {...params}
                    />
                  )}
                />
              </InputWapper>
            </Box>
            <InputWapper>
              <Typography sx={{ fontSize: '16px' }}>Ghi chú:</Typography>
              <InputInfo
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                multiline
                minRows={3}
                maxRows={3}
                fullWidth
                placeholder="Aa"
              />
            </InputWapper>
            <Box
              sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '5px' }}
            >
              <Typography sx={{ color: 'red' }}>{error}</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '5px' }}
            >
              <ButtonOrder onClick={order}>Đặt bàn</ButtonOrder>
            </Box>
          </BoxInput>
        </BoxOrder>
      </Box>
    </RootStyle>
  );
}

export default Order;
