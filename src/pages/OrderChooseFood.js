import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Grid,
  Input,
  InputBase,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';
import TypeFoodItem from '../components/food/TypeFoodItem';
import { actionFoodGetTypeChosen, actionGetFoodsByName } from '../redux/actions/foodAction';
import BoxTypeFoodOrder from '../components/order/BoxTypeFoodOrder';
import TableRowFoodChosen from '../components/order/TableRowFoodChosen';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import ModalInformationFood from '../components/order/ModalInformationFood';
import {
  actionGetAllBooks,
  actionOrderGetOrder,
  actionOrderSetFoods
} from '../redux/actions/orderAction';
import api from '../assets/api/api';
import { sendBookSocket } from '../util/wssConnection';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  marginTop: '120px'
}));
const BoxInformationCustomer = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 2)
}));
const InputWapper = styled(Grid)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  borderRadius: '20px',
  marginTop: '10px',
  padding: '5px'
}));
const TitleInformation = styled(Typography)(({ theme }) => ({
  color: theme.palette.black
}));
const InputInfo = styled(Input)(({ theme }) => ({
  fontSize: '16px',
  width: '100%',
  color: theme.palette.white
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '60%',
  background: theme.palette.white,
  margin: '10px 20%',
  padding: theme.spacing(0.5, 0.5, 0.5, 2),
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    marginLeft: '10%'
  }
}));
const InputSearch = styled(InputBase)(({ theme }) => ({
  fontSize: '16px'
}));
const BoxIconSearch = styled(Box)(({ theme }) => ({
  background: theme.palette.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5, 2),
  borderRadius: '10px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxSort = styled(Card)(({ theme }) => ({
  width: '60%',
  margin: '20px 20%',
  background: theme.palette.gray,
  display: 'flex',
  padding: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    marginLeft: '5%',
    display: 'block'
  }
}));
const ButtonSortPrice = styled(Button)(({ theme }) => ({
  width: '100px',
  fontSize: '12px',
  marginLeft: '10px',
  background: theme.palette.white,
  color: theme.palette.black,
  textTransform: 'none',
  ':hover': {
    background: theme.palette.mainHover
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
const BoxAllFood = styled(Box)(({ theme }) => ({
  width: '90%',
  margin: '20px 5%'
}));
const BoxTable = styled(Box)(({ theme }) => ({
  width: '80%',
  marginLeft: '10%',
  [theme.breakpoints.down('md')]: {
    width: '98%',
    marginLeft: '1%'
  }
}));
const CellHeader = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '18px',
  [theme.breakpoints.down('md')]: {
    fontSize: '12px'
  }
}));
const ButtonPay = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  fontSize: '18px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxTableItem = styled(Grid)(({ theme }) => ({
  padding: '5px',
  maxHeight: '150px',
  display: 'flex'
}));
function TableItem({ table }) {
  const BoxTable = styled(Grid)(({ theme }) => ({
    width: '100%',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.main}`
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.gray,
    fontWeight: 'bold'
  }));
  const IconTable = styled(Icon)(({ theme }) => ({
    width: '40px',
    height: '40px',
    color: theme.palette.gray
  }));
  return (
    <Grid sx={{ padding: '5px', width: '100%' }} item xs={4} sm={4} md={2} lg={2} xl={2}>
      <BoxTable>
        <Title>{table.tenBan}</Title>
        <IconTable icon="ic:round-table-restaurant" />
        <Title>{table.loaiBan}</Title>
        <Title>S??? ng?????i: {table.soNguoiToiDa}</Title>
      </BoxTable>
    </Grid>
  );
}
function OrderChooseFood() {
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.order.foods);
  const book = useSelector((state) => state.order.book);
  const navigate = useNavigate();
  const modalInformationFood = useSelector((state) => state.order.modalInformationFood);
  const typefoods = useSelector((state) => state.food.typefoods);
  const user = useSelector((state) => state.user.user);
  const broadcast = useSelector((state) => state.socket.broadcast);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (book.customerName === '') navigate('/home/order');
    return function () {
      // dispatch(
      //   actionOrderGetOrder({
      //     customerName: '',
      //     email: '',
      //     phone: '',
      //     date: 0,
      //     quantityCustomer: 0,
      //     timeUse: 0,
      //     area: {},
      //     description: ''
      //   })
      // );
      // dispatch(actionOrderSetFoods([]));
    };
  }, []);

  const chooseTypeAll = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: '',
        name: 'all'
      })
    );
  };
  const headers = [
    { name: 'STT', minWidth: '10%', align: 'left' },
    {
      name: 'T??n m??n ??n',
      minWidth: '20%',
      align: 'left'
    },
    {
      name: '????n gi??',
      minWidth: '20%',
      align: 'left'
    },
    {
      name: 'S??? l?????ng',
      minWidth: '20%',
      align: 'left'
    },
    {
      name: 'Th??nh ti???n',
      minWidth: '20%',
      align: 'left'
    },
    {
      name: 'B??? ch???n',
      minWidth: '10%',
      align: 'right'
    }
  ];
  const searchFood = (text) => {
    setSearch(text);
    dispatch(actionGetFoodsByName(text));
  };
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
  const payForOrder = () => {
    if (foods.length === 0) {
      dispatch(
        actionUserSnackbar({
          status: true,
          content: 'Vui l??ng ch???n m??n ??n',
          type: 'error'
        })
      );
    } else {
      navigate('/home/order-payment');
    }
  };
  return (
    <RootStyle>
      <BoxBreadcrumbs name="?????t b??n" />
      <BoxInformationCustomer container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Th??ng tin kh??ch h??ng ?????t b??n
          </Typography>
        </Grid>
        <InputWapper item xs={6} sm={6} md={4} lg={3} xl={3}>
          <TitleInformation sx={{ fontSize: '16px' }}>H??? t??n:</TitleInformation>
          <InputInfo disabled value={book.customerName} fullWidth placeholder="Aa" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={4} lg={3} xl={3}>
          <TitleInformation sx={{ fontSize: '16px' }}>Email:</TitleInformation>
          <InputInfo disabled value={book.email} fullWidth placeholder="Aa" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={4} lg={3} xl={3}>
          <TitleInformation sx={{ fontSize: '16px' }}>S??? ??i???n tho???i:</TitleInformation>
          <InputInfo disabled value={book.phone} fullWidth placeholder="0123456789" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={4} lg={3} xl={3}>
          <Typography sx={{ fontSize: '16px' }}>Th???i gian ?????t b??n</Typography>
          <DatePicker
            disabled
            customInput={<InputInfo fullWidth />}
            selected={new Date().getTime()}
            showTimeSelect
            dateFormat="dd/MM/yyyy, hh:mm a"
            // onChange={(newValue) => {
            //   console.log(newValue.getTime());
            //   setDateUse(newValue);
            // }}
          />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={4} lg={3} xl={3}>
          <Typography sx={{ fontSize: '16px' }}>Th???i gian nh???n b??n</Typography>
          <DatePicker
            disabled
            customInput={<InputInfo fullWidth />}
            selected={book.date}
            showTimeSelect
            dateFormat="dd/MM/yyyy, hh:mm a"
            // onChange={(newValue) => {
            //   console.log(newValue.getTime());
            //   setDateUse(newValue);
            // }}
          />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={4} lg={3} xl={3}>
          <Typography sx={{ fontSize: '16px' }}>Th???i gian s??? d???ng:</Typography>
          <InputInfo disabled value={book.timeUse.name} fullWidth placeholder="0" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={4} lg={3} xl={3}>
          <Typography sx={{ fontSize: '16px' }}>S??? kh??ch:</Typography>
          <InputInfo disabled value={book.quantityCustomer} fullWidth placeholder="0" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={4} lg={3} xl={3}>
          <Typography sx={{ fontSize: '16px' }}>Ghi ch??:</Typography>
          <InputInfo disabled value={book.description} fullWidth placeholder="Aa" />
        </InputWapper>
        <Typography sx={{ fontSize: '16px', margin: '5px 5px 0px' }}>Danh s??ch b??n:</Typography>
        <BoxTableItem container>
          {book.listBan.map((item, index) => (
            <TableItem key={item.id} table={item} />
          ))}
        </BoxTableItem>
      </BoxInformationCustomer>
      <Box sx={{ background: '#3d4045', width: '100%', padding: '20px 0px' }}>
        <BoxTable>
          <Paper sx={{ width: '100%', overflow: 'hidden', background: '#fff' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {headers.map((item, index) => (
                      <CellHeader sx={{ textAlign: item.align, width: item.minWidth }} key={index}>
                        {item.name}
                      </CellHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foods.length === 0 ? (
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '20px',
                          fontFamily: 'sans-serif',
                          textAlign: 'center'
                        }}
                        colSpan={6}
                      >
                        Kh??ch h??ng ch??a ch???n m??n ??n
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {foods.map((item, index) => (
                        <TableRowFoodChosen key={index} index={index} cell={item} />
                      ))}
                    </>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{ fontWeight: 'bold', fontSize: '20px', color: '#000' }}
                    >
                      T???ng ti???n: {`${getTotal().toLocaleString('es-US')} vnd`}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }} colSpan={4}>
                      <ButtonPay onClick={payForOrder}>Ti???p t???c</ButtonPay>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </BoxTable>
        <BoxSearch>
          <InputSearch
            onChange={(e) => searchFood(e.target.value)}
            value={search}
            fullWidth
            placeholder="T??m ki???m m??n ??n"
          />
          <BoxIconSearch>
            <Icon
              style={{ color: '#fff', width: '30px', height: '30px' }}
              icon="ant-design:search-outlined"
            />
          </BoxIconSearch>
        </BoxSearch>
        <BoxSort elevation={3}>
          <Typography sx={{ color: '#fff', fontSize: '16px' }}>S???p x???p theo</Typography>
          <ButtonSortPrice
            onClick={chooseTypeAll}
            sx={typeChosen.name === 'all' && { background: '#3C58C9', color: '#fff' }}
          >
            T???t c???
          </ButtonSortPrice>
          {typefoods.map((item, index) => (
            <TypeFoodItem key={index} type={item} />
          ))}
        </BoxSort>
        <BoxAllFood>
          {typeChosen.name === 'all' ? (
            <>
              {typefoods.map((item, index) => (
                <BoxTypeFoodOrder key={index} type={item} />
              ))}
            </>
          ) : (
            <BoxTypeFoodOrder type={typeChosen} />
          )}
        </BoxAllFood>
      </Box>
      {modalInformationFood.status && <ModalInformationFood />}
    </RootStyle>
  );
}

export default OrderChooseFood;
