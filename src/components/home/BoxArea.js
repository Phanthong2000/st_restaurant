import React, { useState, useEffect } from 'react';
import {
  styled,
  Box,
  Typography,
  Grid,
  Divider,
  Card,
  IconButton,
  Drawer,
  Button
} from '@mui/material';
import Slider from 'react-slick';
import { Scrollbar } from 'smooth-scrollbar-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import api from '../../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px 10%'
}));
const RestaurantName = styled(Typography)(({ theme }) => ({
  color: theme.palette.white,
  fontWeight: 'bold',
  fontSize: '25px',
  fontFamily: theme.typography.fontFamily.primary
}));
const Info = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.white,
  marginTop: '10px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '20px'
}));
function Area({ area, choose }) {
  const [quantity, setQuantity] = useState(0);
  const [showOpacity, setShowOpacity] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Wrapper = styled(Card)(({ theme }) => ({
    background: theme.palette.white,
    height: '450px',
    width: '100%',
    padding: '10px'
  }));
  const ImageTypeFood = styled('img')(({ theme }) => ({
    width: '100%',
    height: '270px',
    borderRadius: '10px'
  }));
  const TypeName = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '20px',
    color: theme.palette.black,
    fontFamily: theme.typography.fontFamily.primary
  }));
  const checkDescription = () => {
    if (area.moTa.length < 150) return `${area.moTa}`;
    return `${area.moTa.substring(0, 150)} ...`;
  };
  return (
    <IconButton
      onMouseEnter={() => {
        setShowOpacity(true);
        console.log('enter');
      }}
      onMouseLeave={() => {
        setShowOpacity(false);
        console.log('over');
      }}
      disableFocusRipple
      disableRipple
      disableTouchRipple
      sx={{ padding: '5%' }}
    >
      <Wrapper>
        <ImageTypeFood src={area.hinhAnh} />
        <Box sx={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
          <TypeName>Tên khu vực: {area.tenKhuVuc}</TypeName>
          <TypeName sx={{ fontSize: '14px' }}>{checkDescription()}</TypeName>
        </Box>
      </Wrapper>
      {showOpacity && (
        <>
          <Box
            sx={{
              background: '#000',
              zIndex: 2,
              width: 'calc(100% - 40px)',
              minHeight: 'calc(100% - 40px)',
              position: 'absolute',
              opacity: 0.5,
              borderRadius: '4px'
            }}
          >
            {' '}
          </Box>
          <IconButton
            onClick={() => choose(area)}
            sx={{
              background: '#fff',
              position: 'absolute',
              zIndex: 3,
              '&:hover': { background: 'lightgrey' }
            }}
          >
            <Icon icon="teenyicons:send-solid" />
          </IconButton>
        </>
      )}
    </IconButton>
  );
}
const BoxLeft = styled(Box)(({ theme }) => ({
  width: '30%',
  height: '100%',
  padding: '10px'
}));
const ImageArea = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '10px'
}));
const BoxCenter = styled(Box)(({ theme }) => ({
  width: '45%',
  height: '100%',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between'
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  width: '25%',
  height: '100%',
  padding: '10px',
  maxHeight: '100%',
  display: 'flex'
}));
const ButtonOrder = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  marginTop: '20px',
  padding: theme.spacing(1, 4),
  fontSize: '16px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function Table({ table }) {
  const BoxTable = styled(Grid)(({ theme }) => ({
    width: '100%',
    padding: '5px'
  }));
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    border: `1px solid lightgrey`,
    borderRadius: '5px',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }));
  const IconTable = styled(Icon)(({ theme }) => ({
    width: '50px',
    height: '50px'
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '12px',
    color: 'gray'
  }));
  return (
    <BoxTable sx={{ width: '100%' }} item xs={4} sm={4} md={4} lg={4} xl={4}>
      <Wrapper>
        <Title>{table.tenBan}</Title>
        <IconTable icon="ic:round-table-restaurant" />
        <Title>Số người: {table.soNguoiToiDa}</Title>
      </Wrapper>
    </BoxTable>
  );
}
function BoxArea() {
  const allAreas = useSelector((state) => state.area.allAreas);
  const [area, setArea] = useState();
  const [drawer, setDrawer] = useState(true);
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const allTables = useSelector((state) => state.area.allTables);
  const chooseArea = async (area) => {
    setTables(allTables.filter((table) => table.khuVuc.id === area.id));
    setArea(area);
    setDrawer(true);
  };
  const goToOrder = () => {
    navigate(`/home/order`);
  };
  return (
    <RootStyle>
      <RestaurantName>Danh sách khu vực</RestaurantName>
      <Divider sx={{ background: 'gray' }} />
      <Info>
        Đến với ST Restaurant quý khách sẽ được tận hưởng các khu vực phục vụ nhà hàng có view tuyệt
        đẹp và thú vị. Nhà hàng chúng tôi luôn cố gắng phát triển nhà hàng để quý khách có thể tận
        hưởng bữa ăn vừa ngon miệng vữa đã mắt.
        <BoxContent>
          <Slider infinite autoplay dots={false} speed={1000} slidesToShow={3} slidesToScroll={3}>
            {allAreas.map((item, index) => (
              <Area choose={chooseArea} key={index} area={item} />
            ))}
          </Slider>
        </BoxContent>
      </Info>
      {area && (
        <Drawer anchor="bottom" open={drawer} onClose={() => setDrawer(false)}>
          <Box
            sx={{
              width: '100%',
              height: '400px',
              background: '#fff',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <BoxLeft>
              <ImageArea src={area.hinhAnh} />
            </BoxLeft>
            <BoxCenter>
              <Box sx={{ width: '20%' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Tên khu vực:</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Mô tả:</Typography>
              </Box>
              <Box sx={{ width: '80%' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  {area.tenKhuVuc}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{area.moTa}</Typography>
                <ButtonOrder onClick={goToOrder}>Đặt bàn ngay</ButtonOrder>
              </Box>
            </BoxCenter>
            <BoxRight>
              <Scrollbar alwaysShowTracks>
                <Grid container sx={{ width: '100%' }}>
                  {tables.map((item, index) => (
                    <Table key={item.id} table={item} />
                  ))}
                </Grid>
                <Box> </Box>
              </Scrollbar>
            </BoxRight>
          </Box>
        </Drawer>
      )}
    </RootStyle>
  );
}

export default BoxArea;
