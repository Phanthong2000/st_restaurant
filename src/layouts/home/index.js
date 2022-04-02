import React from 'react';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Outlet } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { BackTop } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, styled } from '@mui/material';
import HomeNavbar from './HomeNavbar';
import HomeNavbarHeader from './HomeNavbarHeader';
import HomeBottom from './HomeBottom';
import ChatBox from '../../components/home/ChatBox';
import { actionUserOpenChatBox } from '../../redux/actions/userAction';
import ButtonIconChatBox from '../../components/home/ButtonIconChatBox';
import Snack from '../../components/Snack';
import BackdropUser from '../../components/Backdrop';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  width: '100%'
}));
const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  overflow: 'hidden',
  display: 'flex'
}));
function HomeLayout() {
  const openChatBox = useSelector((state) => state.user.openChatBox);
  return (
    <RootStyle>
      <HomeNavbarHeader />
      <HomeNavbar />
      <MainStyle>
        {!openChatBox ? <ButtonIconChatBox /> : <ChatBox />}
        <Outlet />
        <BackdropUser />
        <Snack />
        <BackTop
          style={{
            bottom: 110,
            right: 24
          }}
        >
          <Box
            sx={{
              height: '44px',
              width: '44px',
              borderRadius: '44px',
              background: 'grey',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon
              style={{ color: '#fff', width: '30px', height: '30px' }}
              icon="ant-design:vertical-align-top-outlined"
            />
          </Box>
        </BackTop>
      </MainStyle>
      <HomeBottom />
    </RootStyle>
  );
}

export default HomeLayout;
