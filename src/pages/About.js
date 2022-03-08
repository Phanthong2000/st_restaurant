import { Box, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import MenuAbout from '../components/about/MenuAbout';
import menu from '../assets/data/menu';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';

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
  backgroundImage: `url(http://xaydungtruongphatthinh.com/wp-content/uploads/2020/04/S%E1%BB%ADa-Ch%E1%BB%AFa-Nh%C3%A0-H%C3%A0ng-Tr%E1%BB%8Dn-G%C3%B3i-3.jpg)`,
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
            Điểm nhấn quan trọng nhất tạo nên sự khác biệt của thương hiệu <b>ST Restaurant </b>
            chính là phong cách ẩm thực độc đáo và hiện đại. Các loại gia vị được kết hợp vừa phải,
            nguyên liệu được lựa chọn cẩn thận, đảm bảo tươi ngon và an toàn đến với thực khách.
          </Typography>
        </Box>
        <Grid sx={{ marginTop: '20px' }} container>
          {typefoods.map((item, index) => (
            <MenuAbout key={index} menu={item} />
          ))}
        </Grid>
      </BoxRight>
    </Menu>
  );
}
function About() {
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Nhà hàng" />
      <BoxHeader>
        <Box sx={{ width: '35%' }}>
          <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: '40px' }}>
            Giới thiệu
          </Typography>
          <Typography sx={{ fontSize: '14px', color: 'lightgrey' }}>
            ST Restaurant – với phương châm hoạt động “Ngon lành, Bổ dưỡng và Hợp vệ sinh” – ba yếu
            tố tiên quyết cũng chính là ba điều phước lành mà nhà hàng mong muốn gửi trao cho tất cả
            các thực khách mỗi lần ghé thăm.
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
            Kết hợp hoàn hảo giữa đường nét đương đại và truyền thống, cùng lối thiết kế bếp mở cho
            phép thực khách chiêm ngưỡng quá trình chế biến món ăn điêu luyện của các đầu bếp lành
            nghề, tất cả tạo nên tổng thể hoàn hảo, tinh tế và sống động.
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
          <Typography sx={{ color: '#fff', fontSize: '20px' }}>LIÊN HỆ</Typography>
          <InfoContact>
            Địa chỉ: 1/11/46 Đặng Thuỳ Trâm, phường 13, quận Bình Thạnh, Thành phố Hồ Chí Minh
          </InfoContact>
          <InfoContact>Điện thoại: 097.102.69.10</InfoContact>
          <InfoContact>
            Giờ mở cửa
            <br />
            + Thứ 2 – thứ 5: 7:00 AM – 0:00 AM
            <br />+ Thứ 6 – CN & Ngày lễ: 7:00 AM – 3:00 AM
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
      <BoxMenu />
    </RootStyle>
  );
}

export default About;
