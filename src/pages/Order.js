import { Box, Button, Card, Input, InputBase, styled, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';
import backgroundOrder from '../assets/images/backgroundOrder.png';

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
function Order() {
  const [dateUse, setDateUse] = useState(new Date());
  const navigate = useNavigate();
  const order = () => {
    navigate('/home/order-choose-food');
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
              <InputInfo fullWidth placeholder="Aa" />
            </InputWapper>
            <InputWapper>
              <Typography sx={{ fontSize: '16px' }}>Email:</Typography>
              <InputInfo fullWidth placeholder="Aa" />
            </InputWapper>
            <InputWapper>
              <Typography sx={{ fontSize: '16px' }}>Số điện thoại:</Typography>
              <InputInfo fullWidth placeholder="0123456789" />
            </InputWapper>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Ngày tháng, giờ:</Typography>
                <DatePicker
                  customInput={<InputInfo fullWidth />}
                  selected={dateUse}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy, hh:mm a"
                  onChange={(newValue) => {
                    console.log(newValue.getTime());
                    setDateUse(newValue);
                  }}
                />
              </InputWapper>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Số khách:</Typography>
                <InputInfo fullWidth placeholder="0" />
              </InputWapper>
              <InputWapper>
                <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng:</Typography>
                <InputInfo fullWidth placeholder="0" />
              </InputWapper>
            </Box>
            <InputWapper>
              <Typography sx={{ fontSize: '16px' }}>Ghi chú:</Typography>
              <InputInfo multiline minRows={3} maxRows={3} fullWidth placeholder="Aa" />
            </InputWapper>
            <Box
              sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '10px' }}
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
