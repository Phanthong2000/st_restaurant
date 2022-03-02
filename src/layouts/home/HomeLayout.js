import React from 'react';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Outlet } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import HomeNavbar from './HomeNavbar';
import HomeNavbarHeader from './HomeNavbarHeader';

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
  return (
    <RootStyle>
      <HomeNavbarHeader />
      <HomeNavbar />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

export default HomeLayout;
