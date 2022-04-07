import { Icon } from '@iconify/react';
import { Box, Button, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionOrderSuccess } from '../../redux/actions/orderAction';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: `${heightScreen - 120}px`,
  marginTop: '120px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const IconSuccess = styled(Icon)(({ theme }) => ({ theme }) => ({
  width: '100px',
  height: '100px',
  color: '#77fa5c'
}));
const Success = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '25px',
  marginTop: '20px',
  fontWeight: 'bolder'
}));
const Thank = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  color: 'gray'
}));
const ButtonGoToHome = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontSize: '20px',
  marginTop: '20px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function OrderSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderSuccess = useSelector((state) => state.order.orderSuccess);
  useEffect(() => {
    if (!orderSuccess) navigate('/home/order');
    return function () {
      dispatch(actionOrderSuccess(false));
    };
  }, []);
  const handleGoToHome = () => {
    navigate('/home/app');
  };
  return (
    <RootStyle>
      <Confetti width={window.innerWidth - 50} height={heightScreen} numberOfPieces={1000} />
      <Box>
        <IconSuccess icon="bi:check-circle-fill" />
        <Success>Đặt bàn thành công!</Success>
        <Thank>
          Cảm ơn quý khách đã tin tưởng nhà hàng chúng tôi. Hẹn gặp lại quý khách tại nhà hàng.
        </Thank>
        <ButtonGoToHome onClick={handleGoToHome}>Về trang chủ</ButtonGoToHome>
      </Box>
    </RootStyle>
  );
}

export default OrderSuccess;
