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
import BoxArea from '../components/home/BoxArea';
import BoxNews from '../components/home/BoxNews';

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
      <Title>ST Restaurant - ???m th???c Vi???t Nam</Title>
      <Information>
        ST Restaurant ye??u quy?? s???? tinh t??? cu??a ???m th????c vu??ng mi????n ?????t Vi???t, duye??n th?????t duye??n nhu?? ca??ch
        nh????ng ngu??????i ba??, ngu??????i me?? di??u da??ng cha??m lo cho gia ??i??nh. Ca??m h????ng t???? b????a co??m thu????n Vi?????t luo??n
        ??u?? vi??, ??u?? mo??n giu??p ST Restaurant m????i nga??y cho??n lo??c va?? th????c hi?????n ti?? mi?? t????ng mo??n m?????t, t???? mo??n
        a??n cho??i b????t m????t ??????n nh????ng mo??n chi??nh ??u??????m n????ng du??ng v????i co??m, r????i mo??n canh ma??t da?? va?? tra??ng
        mi?????ng vui vui. Hi vo??ng th????c kha??ch luo??n ca??m nh?????n tro??n hu??o??ng vi?? ????m th????c Vi?????t va?? ca?? s???? t?????n ta??m
        ???? ST Restaurant.
      </Information>
      <ButtonSeeMore onClick={goToAbout}>Xem th??m</ButtonSeeMore>
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
      <BoxArea />
      <BoxNews />
    </RootStyle>
  );
}

export default Home;
