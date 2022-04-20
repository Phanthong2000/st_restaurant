import React, { useEffect, useState } from 'react';
import { styled, Box, Card, Typography, Button, Radio, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import wayPays from '../assets/data/wayPays';
import atms from '../assets/data/atms';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import {
  actionGetAllBooks,
  actionOrderSetFoods,
  actionOrderGetOrder,
  actionOrderSuccess,
  actionModalWayPay
} from '../redux/actions/orderAction';
import api from '../assets/api/api';
import { sendBookSocket } from '../util/wssConnection';
import ModalWayPay from '../components/order/ModalWayPay';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: `${heightScreen - 120}px`,
  marginTop: '120px',
  paddingBottom: '20px',
  background: theme.palette.lightgrey,
  padding: '0px 5% 20px',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'display',
    flexDirection: 'column-reverse',
    marginTop: '0px'
  }
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '70%',
  marginTop: '10px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary,
  fontWeight: 'bold'
}));
const ButtonBack = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '14px',
  color: theme.palette.white,
  background: theme.palette.main,
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxMain = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  marginTop: '10px',
  padding: '10px',
  border: `1px solid lightgrey`,
  borderRadius: '5px'
}));
const TitleWayPay = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.gray,
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxChooseWayPay = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid lightgrey`,
  padding: '10px',
  borderRadius: '5px'
}));
const BoxATM = styled(Grid)(({ theme }) => ({
  width: '90%',
  padding: '10px',
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  marginLeft: '10%'
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
const BoxTotal = styled(Box)(({ theme }) => ({
  width: '30%',
  padding: '10px 0px 10px 10px '
}));
const BoxContentTotal = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  background: theme.palette.white
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
}));
function ATM({ atm, chosen, handleChoose }) {
  const Wrapper = styled(Button)(({ theme }) => ({
    padding: '5px',
    border: `1px solid lightgrey`,
    width: '100%'
  }));
  const IconChoose = styled(Icon)(({ theme }) => ({
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: -5,
    top: -5
  }));
  const ImageATM = styled('img')(({ theme }) => ({
    width: '100%',
    height: '50px'
  }));
  return (
    <Grid sx={{ width: '100%', padding: '5px' }} item xs={4} sm={4} md={2} lg={3} xl={2}>
      <Wrapper
        sx={{ border: chosen === atm.value && `1px solid blue` }}
        onClick={(e) => {
          e.preventDefault();
          handleChoose(atm);
        }}
      >
        <ImageATM src={atm.image} />
        {chosen === atm.value && <IconChoose icon="bi:check-circle-fill" />}
      </Wrapper>
    </Grid>
  );
}
function WayPay({ name, image, value, chosen, handleChange }) {
  const BoxWayPay = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  }));
  const Name = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily.primary,
    marginLeft: '10px'
  }));
  const ImageWayPay = styled('img')(({ theme }) => ({
    width: '40px',
    height: '40px'
  }));
  return (
    <BoxWayPay>
      <Radio onChange={(e) => handleChange(e)} checked={chosen === value} value={value} />
      <ImageWayPay src={image} />
      <Name>{name}</Name>
    </BoxWayPay>
  );
}
function OrderChooseWayPay() {
  const [wayPay, setWayPay] = useState('momo');
  const [atm, setAtm] = useState({});
  const foods = useSelector((state) => state.order.foods);
  const book = useSelector((state) => state.order.book);
  const user = useSelector((state) => state.user.user);
  const broadcast = useSelector((state) => state.socket.broadcast);
  const modalPayWay = useSelector((state) => state.order.modalWayPay);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (book.customerName === '') navigate('/home/order');
    console.log('ok');
    return function () {
      dispatch(
        actionOrderGetOrder({
          customerName: '',
          email: '',
          phone: '',
          date: 0,
          quantityCustomer: 0,
          timeUse: 0,
          listBan: [],
          description: ''
        })
      );
      dispatch(actionOrderSetFoods([]));
    };
  }, []);
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
  const handleChange = (e) => {
    setWayPay(e.target.value);
    console.log(e.target.value);
  };
  const handleChooseATM = (value) => {
    setAtm(value);
  };
  const handleBack = () => {
    navigate('/home/order-choose-food');
  };
  const handlePayment = () => {
    if (wayPay === 'atm') {
      if (atm.value !== undefined) {
        dispatch(
          actionModalWayPay({
            status: true,
            wayPay: {
              wayPay,
              atm
            }
          })
        );
      } else {
        setError('Vui lòng chọn ngân hàng muốn thanh toán');
      }
    } else {
      console.log('oyher');
    }
  };
  const confirmPayment = () => {
    const allSocketAdmin = [];
    broadcast.forEach((broad) => {
      if (broad.type === 'admin') {
        allSocketAdmin.push(broad.socketId);
      }
    });
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Đang xử lý đặt bàn'
      })
    );
    const listChiTietDonDatBan = [];
    foods.forEach((food) => {
      listChiTietDonDatBan.push({
        monAn: {
          id: food.food.id
        },
        soLuong: food.quantity,
        ghiChu: 'Ban đầu'
      });
    });
    const listBan = [];
    book.listBan.forEach((item) => {
      listBan.push({
        id: item.id
      });
    });
    const order = {
      khachHang: {
        id: user.id
      },
      soLuongKhach: parseInt(book.quantityCustomer, 10),
      thoiGianDuKienSuDung: book.timeUse.value,
      thoiGianNhanBan: moment(book.date).format(),
      trangThai: '0',
      ghiChu: book.description,
      listBan: book.listBan,
      listChiTietDonDatBan
    };
    axios
      .post(
        `${api}donDatBan/create`,
        {
          ...order
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(actionGetAllBooks(user.id));
        axios
          .post(
            `${api}thongBao/create`,
            {
              donDatBan: {
                id: res.data.id
              },
              khachHang: {
                id: user.id
              },
              loaiThongBao: 'Đặt bàn',
              trangThai: 'Chưa đọc'
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            }
          )
          .then((resNoti) => {
            dispatch(actionOrderSuccess(true));
            sendBookSocket({
              socketIds: allSocketAdmin,
              book: res.data,
              notification: resNoti.data
            });
            dispatch(
              actionUserBackdrop({
                status: false,
                content: 'Đang xử lý đặt bàn'
              })
            );
            dispatch(
              actionUserSnackbar({
                status: true,
                content: 'Đặt bàn thành công',
                type: 'success'
              })
            );
            navigate('/home/order-success');
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <RootStyle>
      <BoxContent>
        <Box
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex'
          }}
        >
          <Title>Tiến hành thanh toán</Title>
          <ButtonBack onClick={handleBack}>Thay đổi món ăn</ButtonBack>
        </Box>
        <BoxMain>
          <TitleWayPay>Chọn hình thức thanh toán</TitleWayPay>
          <BoxChooseWayPay>
            {wayPays.map((item, index) => (
              <WayPay
                handleChange={handleChange}
                key={index}
                image={item.image}
                chosen={wayPay}
                name={item.name}
                value={item.value}
              />
            ))}
            {wayPay === 'atm' && (
              <BoxATM container>
                {atms.map((item, index) => (
                  <ATM key={index} atm={item} handleChoose={handleChooseATM} chosen={atm.value} />
                ))}
              </BoxATM>
            )}
          </BoxChooseWayPay>
        </BoxMain>
        <Typography sx={{ color: 'red', width: '100%', textAlign: 'center', marginTop: '10px' }}>
          {error}
        </Typography>
        <ButtonPayment onClick={handlePayment}>{`Thanh toán ${(getTotal() * 0.3).toLocaleString(
          `es-US`
        )} vnđ`}</ButtonPayment>
      </BoxContent>
      <BoxTotal>
        <BoxContentTotal>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <TitleWayPay>Tổng tiền món ăn</TitleWayPay>
            <Value>{getTotal().toLocaleString(`es-US`)} vnđ</Value>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '20px'
            }}
          >
            <TitleWayPay>Tiền cọc thanh toán: (30%)</TitleWayPay>
            <Value>{(getTotal() * 0.3).toLocaleString(`es-US`)} vnđ</Value>
          </Box>
        </BoxContentTotal>
      </BoxTotal>
      {modalPayWay.status && <ModalWayPay payment={confirmPayment} />}
    </RootStyle>
  );
}

export default OrderChooseWayPay;
