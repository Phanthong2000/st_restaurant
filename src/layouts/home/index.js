import React from 'react';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Outlet } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, styled } from '@mui/material';
import HomeNavbar from './HomeNavbar';
import HomeNavbarHeader from './HomeNavbarHeader';
import HomeBottom from './HomeBottom';
import ChatBox from '../../components/home/ChatBox';
import { actionUserOpenChatBox } from '../../redux/actions/userAction';
import ButtonIconChatBox from '../../components/home/ButtonIconChatBox';

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
const ButtonIconChat = styled(IconButton)(({ theme }) => ({
  background: theme.palette.white,
  position: 'fixed',
  zIndex: 999,
  bottom: 30,
  right: 30,
  ':hover': {
    background: theme.palette.lightgrey
  }
}));
const IconChat = styled(Icon)(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: theme.palette.gray
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
      </MainStyle>
      <HomeBottom />
    </RootStyle>
  );
}

export default HomeLayout;
