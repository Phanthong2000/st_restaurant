import React, { useState } from 'react';
import { Box, Card, Grid, styled, Typography, Button } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import BookDetail from '../order/BookDetail';

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  background: theme.palette.white
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  color: theme.palette.black,
  fontFamily: theme.typography.fontFamily.primary,
  marginBottom: '20px'
}));
function Book({ book, click }) {
  const BoxBook = styled(Card)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: '10px'
  }));
  const CheckIn = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '14px',
    color: theme.palette.gray
  }));
  const ButtonSeeDetail = styled(Button)(({ theme }) => ({
    width: '100%',
    marginTop: '10px',
    textTransform: 'none',
    fontWeight: 'bold',
    color: theme.palette.white,
    background: theme.palette.main,
    ':hover': {
      background: theme.palette.mainHover
    }
  }));
  const checkStatus = () => {
    if (
      book.trangThai === `0` &&
      new Date().getTime() -
        (Date.parse(book.thoiGianNhanBan) + book.thoiGianDuKienSuDung * 60 * 1000) <=
        0
    )
      return `Chưa sử dụng`;
    if (book.trangThai === '1') return 'Đã sử dụng';
    if (
      new Date().getTime() -
        (Date.parse(book.thoiGianNhanBan) + book.thoiGianDuKienSuDung * 60 * 1000) >
        0 &&
      book.trangThai === `0`
    )
      return `Đã quá hạn`;
    if (book.trangThai === '2') return 'Đang sử dụng';
  };
  const getTotal = () => {
    let total = 0;
    book.listChiTietDonDatBan.forEach((item) => {
      total += item.monAn.donGia * item.soLuong;
    });
    return total + book.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000;
  };
  return (
    <BoxBook elevation={3}>
      <Box>
        <CheckIn>
          Thời gian nhận bàn: {moment(book.thoiGianNhanBan).format(`hh:mm a DD/MM/yyyy`)}
        </CheckIn>
        <CheckIn>Thời gian dự kiến sử dụng: {book.thoiGianDuKienSuDung / (60 * 1000)}p</CheckIn>
        <CheckIn>Số lượng khách: {book.soLuongKhach} người</CheckIn>
        <CheckIn>Trạng thái: {checkStatus()}</CheckIn>
        <CheckIn>
          Thời gian đặt bàn: {moment(Date.parse(book.createAt)).format(`hh:mm a DD/MM/yyyy`)}
        </CheckIn>
        <CheckIn>Số lượng món ăn: {book.listChiTietDonDatBan.length} món</CheckIn>
        <CheckIn>Tổng tiền: {getTotal().toLocaleString(`es-US`)} vnđ</CheckIn>
      </Box>
      <ButtonSeeDetail onClick={click}>Xem chi tiết</ButtonSeeDetail>
    </BoxBook>
  );
}
function HistoryOrder() {
  const [detail, setDetail] = useState(false);
  const [book, setBook] = useState({});
  const allBooks = useSelector((state) => state.order.allBooks);
  const back = () => {
    setDetail(false);
  };
  if (detail) return <BookDetail back={back} book={book} />;
  return (
    <RootStyle>
      <Title>Danh sách đơn đặt bàn</Title>
      <Grid container>
        {allBooks.map((item, index) => {
          const click = () => {
            setBook(item);
            setDetail(true);
          };
          return (
            <Grid sx={{ padding: '10px' }} item xs={12} sm={12} md={6} lg={6} xl={4} key={index}>
              <Book click={() => click()} book={item} />
            </Grid>
          );
        })}
      </Grid>
    </RootStyle>
  );
}

export default HistoryOrder;
