import React, { useEffect, useState } from 'react';
import { styled, Box, Typography, Divider, Card, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import imageMenuTypeFood from '../../assets/data/imageMenuTypoFood';
import api from '../../assets/api/api';
import { actionFoodGetTypeChosen } from '../../redux/actions/foodAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px 10%'
}));
const RestaurantName = styled(Typography)(({ theme }) => ({
  color: theme.palette.white,
  fontWeight: 'bold',
  fontSize: '30px',
  fontFamily: theme.typography.fontFamily.second
}));
const Info = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.white,
  marginTop: '10px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function TypeFood({ typefood, index }) {
  const [quantity, setQuantity] = useState(0);
  const [showOpacity, setShowOpacity] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chooseTypeFood = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: typefood.id,
        name: typefood.tenLoaiMonAn
      })
    );
    navigate('/home/food');
  };
  const getQuantityMonAn = () => {
    axios
      .get(`${api}monAn/list/loaiMonAn/`, {
        params: {
          maLoaiMonAn: typefood.id
        }
      })
      .then((res) => setQuantity(res.data.length));
  };
  useEffect(() => {
    getQuantityMonAn();
    return null;
  }, []);
  const Wrapper = styled(Card)(({ theme }) => ({
    background: theme.palette.white,
    height: '400px',
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
        <ImageTypeFood src={typefood.hinhAnh} />
        <Box sx={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
          <TypeName>{typefood.tenLoaiMonAn}</TypeName>
          <TypeName sx={{ fontSize: '14px' }}>Số lượng món ăn: {`${quantity} món ăn`}</TypeName>
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
            onClick={chooseTypeFood}
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
function BoxTypoFoods() {
  const typefoods = useSelector((state) => state.food.typefoods);
  return (
    <RootStyle>
      <RestaurantName>ST Restaurant</RestaurantName>
      <Divider sx={{ background: 'gray' }} />
      <Info>
        Tọa lạc ở những địa điểm sầm uất nhất thành phố với không gian sang trọng, mang đậm dấu ấn
        văn hóa truyền thống đặc trưng, ST Restaurant là điểm dừng chân thưởng thức ẩm thực lý tưởng
        bên người thân, bạn bè.
      </Info>
      <BoxContent>
        <Slider infinite autoplay dots={false} speed={1000} slidesToShow={3} slidesToScroll={3}>
          {typefoods.map((item, index) => (
            <TypeFood key={index} typefood={item} index={index} />
          ))}
        </Slider>
      </BoxContent>
    </RootStyle>
  );
}

export default BoxTypoFoods;
