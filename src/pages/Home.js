import React, { useEffect } from 'react';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Carousel } from 'react-responsive-carousel';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BackTop } from 'antd';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import sloganHome from '../assets/data/sloganHome';
import SloganHome from '../components/home/SloganHome';
import BoxTypoFoods from '../components/home/BoxTypoFoods';

const heightScreen = window.innerHeight - 1;
const widthScreen = window.innerWidth - 17;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.background,
  paddingBottom: '50px'
}));
const ImageIntro = styled('img')(() => ({
  width: widthScreen,
  height: '100%'
}));
const BoxSlogan = styled(Stack)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
function AboutUs() {
  const navigate = useNavigate();
  const BoxAbout = styled(Box)(({ them }) => ({
    width: '100%',
    textAlign: 'center'
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '30px',
    color: theme.palette.white,
    fontFamily: theme.typography.fontFamily.second,
    marginTop: '20px',
    textTransform: 'uppercase'
  }));
  const Information = styled(Typography)(({ theme }) => ({
    color: theme.palette.lightgrey,
    width: '100%',
    padding: '20px 200px',
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
      padding: '10px 50px'
    }
  }));
  const ButtonSeeMore = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 3),
    textTransform: 'none',
    fontFamily: theme.typography.fontFamily.second,
    fontSize: '16px',
    color: theme.palette.white,
    fontWeight: 'bold',
    background: theme.palette.gray,

    ':hover': {
      background: theme.palette.gray
    }
  }));
  const goToAbout = () => {
    navigate('/home/about');
  };
  return (
    <BoxAbout>
      <Title>ST Restaurant - Ẩm thực Việt Nam</Title>
      <Information>
        ST Restaurant yêu quý sự tinh tế của ẩm thực vùng miền đất Việt, duyên thật duyên như cách
        những người bà, người mẹ dịu dàng chăm lo cho gia đình. Cảm hứng từ bữa cơm thuần Việt luôn
        đủ vị, đủ món giúp ST Restaurant mỗi ngày chọn lọc và thực hiện tỉ mỉ từng món một, từ món
        ăn chơi bắt mắt đến những món chính đượm nồng dùng với cơm, rồi món canh mát dạ và tráng
        miệng vui vui. Hi vọng thực khách luôn cảm nhận tròn hương vị ẩm thực Việt và cả sự tận tâm
        ở ST Restaurant.
      </Information>
      <ButtonSeeMore onClick={goToAbout}>Xem thêm</ButtonSeeMore>
    </BoxAbout>
  );
}
function Home() {
  return (
    <RootStyle>
      <Box sx={{ width: widthScreen }}>
        <Carousel
          showThumbs={false}
          width={widthScreen}
          autoPlay
          infiniteLoop
          interval={3000}
          showArrows={false}
        >
          <ImageIntro src="https://wallpaperaccess.com/full/3014596.jpg" alt="image1" />
          <ImageIntro
            src="https://i.pinimg.com/originals/3d/a3/7d/3da37dc6421f978a50e165466f221d72.jpg"
            alt="image1"
          />
          <ImageIntro src="https://wallpaperaccess.com/full/3692584.jpg" alt="image1" />
        </Carousel>
      </Box>
      <AboutUs />
      <BoxSlogan>
        {sloganHome.map((item, index) => (
          <SloganHome slogan={item} key={index} index={index} />
        ))}
      </BoxSlogan>
      <BoxTypoFoods />
    </RootStyle>
  );
}

export default Home;
