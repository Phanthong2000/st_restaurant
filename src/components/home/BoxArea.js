import React, { useState } from 'react';
import { styled, Box, Typography, Divider, Card, IconButton, Drawer, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

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
    if (area.moTa.length < 150) return `${area.moTa.length}`;
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
  width: '40%',
  height: '100%',
  padding: '5%'
}));
const ImageArea = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '10px'
}));
const BoxRight = styled(Box)(({ theme }) => ({
  width: '60%',
  height: '100%',
  padding: '5%',
  display: 'flex',
  justifyContent: 'space-between'
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
function BoxArea() {
  const allAreas = useSelector((state) => state.area.allAreas);
  const [area, setArea] = useState();
  const [drawer, setDrawer] = useState(true);
  const navigate = useNavigate();
  const chooseArea = (area) => {
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
            <BoxRight>
              <Box sx={{ width: '20%' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Tên khu vực:</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Mô tả:</Typography>
              </Box>
              <Box sx={{ width: '80%' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                  {area.tenKhuVuc}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>{area.moTa}</Typography>
                <ButtonOrder onClick={goToOrder}>Đặt bàn ngay</ButtonOrder>
              </Box>
            </BoxRight>
          </Box>
        </Drawer>
      )}
    </RootStyle>
  );
}

export default BoxArea;
