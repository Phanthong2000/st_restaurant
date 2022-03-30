import React from 'react';
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
  TableRow
} from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  width: '90%',
  margin: '20px 5%',
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
BookDetail.prototype = {
  book: PropTypes.object
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
      <Cell>{(food.monAn.donGia * food.soLuong).toLocaleString(`es-US`)} vnđ</Cell>
    </TableRow>
  );
}
function BookDetail({ book }) {
  const checkStatus = () => {
    if (book.trangThai === `0`) return `Chưa sử dụng`;
    if (book.trangThai === `1`) return `Đã sử dung`;
  };
  const getTotal = () => {
    let total = 0;
    book.listChiTietDonDatBan.forEach((don) => {
      total += don.soLuong * don.monAn.donGia;
    });
    return total;
  };
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
      name: 'Thành tiền',
      width: '15%'
    }
  ];
  return (
    <RootStyle>
      <Title>Thông tin đơn đặt bàn</Title>
      <BoxDetail>
        <LabelDetail>Thời gian nhận bàn: </LabelDetail>
        <ContentDetail>{moment(book.thoiGianNhanBan).format(`hh:mm a DD/MM/yyyy`)}</ContentDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Thời gian dự kiến sử dụng: </LabelDetail>
        <ContentDetail>{book.thoiGianDuKienSuDung}p</ContentDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Số lượng khách: </LabelDetail>
        <ContentDetail>{book.soLuongKhach} người</ContentDetail>
      </BoxDetail>
      <BoxDetail>
        <LabelDetail>Tình trạng: </LabelDetail>
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
              {book.listChiTietDonDatBan.map((item, index) => (
                <RowFood key={index} index={index} food={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </RootStyle>
  );
}

export default BookDetail;
