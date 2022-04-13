import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  styled,
  Card,
  Typography,
  Box,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
  Tabs,
  Tab,
  TableFooter
} from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  background: theme.palette.white
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px'
  }
}));
const BoxDetail = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  marginTop: '10px'
}));
const LabelDetail = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  width: '40%'
}));
const ContentDetail = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold'
}));
const ButtonBack = styled(Button)(({ theme }) => ({
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '14px',
  textTransform: 'none',
  marginTop: '20px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
BookDetail.prototype = {
  book: PropTypes.object,
  back: PropTypes.func
};
function RowFood({ food, index }) {
  const Cell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold'
  }));
  return (
    <TableRow
      sx={
        index % 2 === 0
          ? { background: 'lightgrey', color: '#fff' }
          : { background: '#fff', color: '#000' }
      }
    >
      <Cell>{index + 1}</Cell>
      <Cell>{food.monAn.tenMonAn}</Cell>
      <Cell>{food.monAn.donGia.toLocaleString(`es-US`)} vnđ</Cell>
      <Cell>{food.soLuong}</Cell>
      <Cell>{food.ghiChu}</Cell>
      <Cell>{(food.monAn.donGia * food.soLuong).toLocaleString(`es-US`)} vnđ</Cell>
    </TableRow>
  );
}
function TableFood({ listChiTietDonDatBan }) {
  const header = [
    {
      name: 'STT',
      width: '10%'
    },
    {
      name: 'Tên món ăn',
      width: '20%'
    },
    {
      name: 'Đơn giá',
      width: '15%'
    },
    {
      name: 'Số lượng',
      width: '15%'
    },
    {
      name: 'Ghi chú',
      width: '15%'
    },
    {
      name: 'Thành tiền',
      width: '15%'
    }
  ];
  return (
    <Card sx={{ width: '100%', marginTop: '10px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'gray' }}>
              {header.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{ width: item.width, color: '#fff', fontWeight: 'bold' }}
                >
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listChiTietDonDatBan.map((item, index) => (
              <RowFood key={index} index={index} food={item} />
            ))}
          </TableBody>
          {/* <TableFooter>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={6}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Tổng tiền loại {tab}: {getTotalTab().toLocaleString(`es-US`)} vnd
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter> */}
        </Table>
      </TableContainer>
    </Card>
  );
}
function TableTable({ listBan }) {
  const Cell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold'
  }));
  const headers = [
    {
      name: 'STT',
      width: '10%'
    },
    {
      name: 'Tên bàn',
      width: '40%'
    },
    {
      name: 'Số người',
      width: '30%'
    },
    {
      name: 'Khu vực',
      width: '20%'
    }
  ];
  return (
    <Card sx={{ width: '100%', marginTop: '10px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'gray' }}>
              {headers.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{ width: item.width, color: '#fff', fontWeight: 'bold' }}
                >
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listBan.map((item, index) => (
              <TableRow
                sx={
                  index % 2 === 0
                    ? { background: 'lightgrey', color: '#fff' }
                    : { background: '#fff', color: '#000' }
                }
                key={index}
              >
                <Cell>{index + 1}</Cell>
                <Cell>{item.tenBan}</Cell>
                <Cell>{item.soNguoiToiDa}</Cell>
                <Cell>{item.khuVuc.tenKhuVuc}</Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
function BookDetail({ book, back }) {
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
    return total;
  };
  // const handleChangeTab = (event, newValue) => {
  //   setTab(newValue);
  // };
  return (
    <RootStyle>
      <Title>Thông tin đơn đặt bàn</Title>
      <BoxDetail>
        <LabelDetail>Thời gian nhận bàn: </LabelDetail>
        <ContentDetail>{moment(book.thoiGianNhanBan).format(`hh:mm a DD/MM/yyyy`)}</ContentDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Thời gian dự kiến sử dụng: </LabelDetail>
        <ContentDetail>{book.thoiGianDuKienSuDung / (60 * 1000)}p</ContentDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Số lượng khách: </LabelDetail>
        <ContentDetail>{book.soLuongKhach} người</ContentDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Trạng thái: </LabelDetail>
        <ContentDetail>{checkStatus()}</ContentDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Thời gian đặt bàn: </LabelDetail>
        <ContentDetail>
          {moment(Date.parse(book.createAt)).format(`hh:mm a DD/MM/yyyy`)}
        </ContentDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Số lượng món ăn: {book.listChiTietDonDatBan.length} món</LabelDetail>
        <LabelDetail>Tổng tiền: {getTotal().toLocaleString(`es-US`)} vnđ</LabelDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Danh sách món ăn của đơn đặt bàn</LabelDetail>
      </BoxDetail>
      <Box sx={{ width: '100%' }}>
        <TableFood listChiTietDonDatBan={book.listChiTietDonDatBan} />
        {/* <Tabs value={tab} onChange={handleChangeTab}>
          {book.listLoaiBan.map((item, index) => (
            <Tab key={index} value={item.order} label={`Loại ${item.order}`} />
          ))}
        </Tabs>
        {book.listLoaiBan.map((item, index) => (
          <TableFood key={index} tab={tab} loaiBan={item} />
        ))} */}
      </Box>
      <BoxDetail>
        <LabelDetail>Danh sách bàn</LabelDetail>
      </BoxDetail>
      <TableTable listBan={book.listBan} />
      <ButtonBack onClick={back}>Quay lại</ButtonBack>
    </RootStyle>
  );
}

export default BookDetail;
