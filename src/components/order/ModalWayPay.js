import React, { useState } from 'react';
import moment from 'moment';
import { styled, Card, Box, Modal, Typography, Divider, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { actionModalWayPay } from '../../redux/actions/orderAction';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  background: '#fff',
  padding: theme.spacing(2, 2, 2),
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    width: '500px'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary
}));
const OtherWayPay = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  cursor: 'pointer',
  color: theme.palette.main,
  ':hover': {
    color: theme.palette.mainHover
  }
}));
const Input = styled(TextField)(({ theme }) => ({
  marginTop: '20px'
}));
const ButtonPayment = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  color: theme.palette.white,
  fontWeight: 'bold',
  marginTop: '20px',
  width: '100%',
  background: theme.palette.main,
  ':hover': {
    background: theme.palette.mainHover
  }
}));
ModalWayPay.prototype = {
  payment: PropTypes.func
};
function ModalWayPay({ payment }) {
  const modalWayPay = useSelector((state) => state.order.modalWayPay);
  const foods = useSelector((state) => state.order.foods);
  const temp = 'XXXX XXXX XXXX XXXX';
  const tempValid = 'mm/yy';
  const [name, setName] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const getTotal = () => {
    if (foods.length === 0) {
      return 0;
    }
    let total = 0;
    foods.forEach((food) => {
      total += food.food.donGia * food.quantity;
    });
    return total;
  };
  const handleChangeText = (e) => {
    e.preventDefault();
    console.log(e.target.value.length);
    if (e.target.value.match(`^[0-9 ]{0,}$`))
      if (e.target.value.length < input.length) {
        setInput(e.target.value);
        if (
          e.target.value.length === 5 ||
          e.target.value.length === 10 ||
          e.target.value.length === 15
        ) {
          console.log('5cc');
          setInput(e.target.value.slice(0, -1));
        }
      } else {
        setInput(e.target.value);
        if (
          e.target.value.length === 4 ||
          e.target.value.length === 9 ||
          e.target.value.length === 14
        ) {
          setInput(e.target.value.concat(' '));
        }
      }
  };
  const handleClose = () => {
    dispatch(
      actionModalWayPay({
        status: false,
        wayPay: {}
      })
    );
  };
  const handlChangeValidFrom = (e) => {
    e.preventDefault();
    console.log(e.target.value.length);
    if (e.target.value.match(`^[0-9/]{0,}$`)) {
      if (e.target.value.length < validFrom.length) {
        setValidFrom(e.target.value);
        if (e.target.value.length === 3) {
          setValidFrom(e.target.value.slice(0, -1));
        }
      } else {
        setValidFrom(e.target.value);
        if (e.target.value.length === 2) {
          setValidFrom(e.target.value.concat('/'));
        }
      }
    }
  };
  const handlePayment = () => {
    if (input.length < 19) {
      setError('Số thẻ không hợp lệ');
    } else if (name.length === 0) {
      setError('Tên chủ thẻ không hợp lệ');
    } else if (
      validFrom.length < 5 ||
      parseInt(validFrom.substring(0, 2), 10) > 12 ||
      parseInt(validFrom.substring(3, 5), 10) > new Date().getFullYear() - 2000 ||
      (parseInt(validFrom.substring(3, 5), 10) === new Date().getFullYear() - 2000 &&
        parseInt(validFrom.substring(0, 2), 10) > parseInt(moment(new Date()).format(`MM`), 10))
    ) {
      setError('Ngày phát hành không hợp lệ');
    } else {
      setError(``);
      payment();
      handleClose();
    }
  };
  return (
    <Modal open={modalWayPay.status}>
      <BoxModal>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title>Nhập thông tin thẻ</Title>
          <OtherWayPay>Chọn phương thức thanh toán khác</OtherWayPay>
        </Box>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box
          sx={{
            width: '40%',
            marginLeft: '30%',
            height: '150px',
            backgroundImage: `url(${modalWayPay.wayPay.atm.background})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: `no-repeat `,
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '10px',
            display: 'flex'
          }}
        >
          <Box> </Box>
          <Box> </Box>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography sx={{ color: '#fff', fontSize: '20px' }}>
              {input.concat(temp.substring(input.length, temp.length))}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#fff'
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: '14px', maxHeight: '10px' }}>
              {name === '' ? `Tên chủ thẻ` : name}
            </Typography>
            <Box>
              <Typography sx={{ fontSize: '12px' }}>Valid from</Typography>
              <Typography>
                {validFrom.concat(tempValid.substring(validFrom.length, tempValid.length))}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box>
          <Input
            fullWidth
            inputProps={{ maxLength: 19 }}
            value={input}
            onChange={handleChangeText}
            placeholder="Nhập số thẻ"
            label="Số thẻ"
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              fullWidth
              label="Tên chủ thẻ"
              placeholder="Nhập tên chủ thẻ"
            />
            <Input
              value={validFrom}
              onChange={(e) => handlChangeValidFrom(e)}
              sx={{ marginLeft: '10px' }}
              fullWidth
              placeholder="mm/yy"
              label="Ngày phát hành"
              inputProps={{ maxLength: 5 }}
            />
          </Box>
        </Box>
        <Typography sx={{ color: 'red', width: '100%', textAlign: 'center' }}>{error}</Typography>
        <ButtonPayment onClick={handlePayment}>{`Thanh toán ${(getTotal() * 0.3).toLocaleString(
          `es-US`
        )} vnđ`}</ButtonPayment>
      </BoxModal>
    </Modal>
  );
}

export default ModalWayPay;
