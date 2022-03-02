import React from 'react';
import { Box, styled } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const heightScreen = window.innerHeight - 1;
const widthScreen = window.innerWidth - 17;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#3d4045',
  minHeight: `2000px`
}));
const BoxAdvertisement = styled(Box)(({ theme }) => ({
  width: '100%',
  height: `${heightScreen}px`,
  backgroundImage: `url(https://wallpaperaccess.com/full/3014596.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%'
}));
const ImageIntro = styled('img')(() => ({
  width: widthScreen,
  height: '100%'
}));
function Home() {
  return (
    <RootStyle>
      <Box sx={{ width: widthScreen }}>
        <Carousel width={widthScreen} autoPlay infiniteLoop interval={3000} showArrows={false}>
          <ImageIntro src="https://wallpaperaccess.com/full/3014596.jpg" alt="image1" />
          <ImageIntro
            src="https://i.pinimg.com/originals/3d/a3/7d/3da37dc6421f978a50e165466f221d72.jpg"
            alt="image1"
          />
          <ImageIntro src="https://wallpaperaccess.com/full/3692584.jpg" alt="image1" />
        </Carousel>
      </Box>
    </RootStyle>
  );
}

export default Home;
