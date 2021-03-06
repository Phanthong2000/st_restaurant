import { Box, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import MenuAbout from '../components/about/MenuAbout';
import menu from '../assets/data/menu';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';
import Map from '../components/map/Map';
import Contact from './Contact';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '120px',
  background: theme.palette.background
}));
const BoxHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundImage: `url(https://d1-concepts.com/wp-content/themes/d1concept/assets/images/about/about_bg.png)`,
  height: '500px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '300px 300px',
  padding: theme.spacing(3, 10),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const ImageAbout = styled('img')(() => ({
  width: '100%'
}));
const BoxContact = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '500px',
  backgroundSize: '100% 100%',
  backgroundImage: `url(http://wallpaperstock.net/delightful-vintage-restaurant_wallpapers_50547_1920x1080.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const IconContact = styled(Icon)(({ theme }) => ({
  color: theme.palette.white,
  width: '25px',
  height: '25px',
  cursor: 'pointer',
  marginRight: '10px'
}));
const InfoContact = styled(Typography)(({ theme }) => ({
  color: theme.palette.white,
  fontSize: '14px',
  marginTop: '5px'
}));
function BoxMenu() {
  const Menu = styled(Box)(({ theme }) => ({
    width: '100%',
    background: theme.palette.white,
    padding: theme.spacing(3, 10),
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  }));
  const BoxLeft = styled(Box)(({ theme }) => ({
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }));
  const ImageLeft = styled('img')(({ theme }) => ({
    width: '100%'
  }));
  const BoxRight = styled(Box)(({ theme }) => ({
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }));
  const Title = styled(Typography)(({ theme }) => ({
    width: '20%',
    fontSize: '50px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px'
    }
  }));
  const typefoods = useSelector((state) => state.food.typefoods);
  return (
    <Menu>
      <BoxLeft>
        <ImageLeft src="https://d1-concepts.com/wp-content/uploads/2020/10/menu.png" />
      </BoxLeft>
      <BoxRight>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title>Menu</Title>
          <Typography sx={{ width: '70%', fontSize: '14px', fontFamily: 'sans-serif' }}>
            ??i???m nh???n quan tr???ng nh???t t???o n??n s??? kh??c bi???t c???a th????ng hi???u <b>ST Restaurant </b>
            ch??nh l?? phong c??ch ???m th???c ?????c ????o v?? hi???n ?????i. C??c lo???i gia v??? ???????c k???t h???p v???a ph???i,
            nguy??n li???u ???????c l???a ch???n c???n th???n, ?????m b???o t????i ngon v?? an to??n ?????n v???i th???c kh??ch.
          </Typography>
        </Box>
        <Grid sx={{ marginTop: '20px' }} container>
          {typefoods.map((item, index) => (
            <MenuAbout key={index} index={index} menu={item} />
          ))}
        </Grid>
      </BoxRight>
    </Menu>
  );
}
function About() {
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Nh?? h??ng" />
      <BoxHeader>
        <Box sx={{ width: '35%' }}>
          <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: '40px' }}>
            Gi???i thi???u
          </Typography>
          <Typography sx={{ fontSize: '14px', color: 'lightgrey' }}>
            ST Restaurant ??? v???i ph????ng ch??m ho???t ?????ng ???Ngon l??nh, B??? d?????ng v?? H???p v??? sinh??? ??? ba y???u
            t??? ti??n quy???t c??ng ch??nh l?? ba ??i???u ph?????c l??nh m?? nh?? h??ng mong mu???n g???i trao cho t???t c???
            c??c th???c kh??ch m???i l???n gh?? th??m.
          </Typography>
          <Box
            sx={{
              border: `1px solid #fff`,
              width: '100%',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px'
            }}
          >
            <ImageAbout src="https://www.teahub.io/photos/full/19-191863_2048x1352-amazing-food-desktop-wallpaper-full-size-restaurant.jpg" />
          </Box>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box
            sx={{
              border: `1px solid #fff`,
              width: '100%',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px'
            }}
          >
            <ImageAbout src="https://www.eureporter.co/wp-content/uploads/2020/11/Caribbean-food.jpeg" />
          </Box>
          <Typography sx={{ fontSize: '14px', color: 'lightgrey', marginTop: '10px' }}>
            K???t h???p ho??n h???o gi???a ???????ng n??t ??????ng ?????i v?? truy???n th???ng, c??ng l???i thi???t k??? b???p m??? cho
            ph??p th???c kh??ch chi??m ng?????ng qu?? tr??nh ch??? bi???n m??n ??n ??i??u luy???n c???a c??c ?????u b???p l??nh
            ngh???, t???t c??? t???o n??n t???ng th??? ho??n h???o, tinh t??? v?? s???ng ?????ng.
          </Typography>
        </Box>
      </BoxHeader>
      <BoxContact>
        <Box
          sx={{
            background: '#000',
            opacity: 0.7,
            width: '450px',
            padding: '20px',
            borderRadius: '20px'
          }}
        >
          <Typography sx={{ color: '#fff', fontSize: '20px' }}>LI??N H???</Typography>
          <InfoContact>
            ?????a ch???: 1/11/46 ?????ng Thu??? Tr??m, ph?????ng 13, qu???n B??nh Th???nh, Th??nh ph??? H??? Ch?? Minh
          </InfoContact>
          <InfoContact>??i???n tho???i: 097.102.69.10</InfoContact>
          <InfoContact>
            Gi??? m??? c???a
            <br />
            + Th??? 2 ??? th??? 5: 7:00 AM ??? 0:00 AM
            <br />+ Th??? 6 ??? CN & Ng??y l???: 7:00 AM ??? 3:00 AM
          </InfoContact>
          <InfoContact>Email: phanthong2k000@gmail.com</InfoContact>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              marginTop: '10px'
            }}
          >
            <IconContact icon="simple-line-icons:social-facebook" />
            <IconContact icon="uit:youtube" />
            <IconContact icon="ph:instagram-logo" />
          </Box>
        </Box>
      </BoxContact>
      <Map />
      <BoxMenu />
      <Contact />
    </RootStyle>
  );
}

export default About;
