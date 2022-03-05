import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Stack, styled, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import profileSidebarConfig from '../components/profile/ProfileSidebarConfig';
import MenuItemProfile from '../components/profile/MenuItemProfile';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  marginTop: '120px',
  display: 'flex'
}));
const BoxAvatar = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2)
}));
const ProfileSidebar = styled(Box)(({ theme }) => ({
  width: '300px',
  background: theme.palette.background,
  height: `${heightScreen - 120}px`
}));
const SpaceTop = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100px'
}));
const MenuBox = styled(Stack)(({ theme }) => ({
  background: theme.palette.lightgrey
}));
const BoxContent = styled(Box)(({ theme }) => ({
  background: theme.palette.lightgrey,
  width: '100%'
}));
const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
}));
const Phone = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.gray,
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '12px',
  marginLeft: '5px'
}));
function Profile() {
  const [user, setUser] = useState({});
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);
  return (
    <RootStyle>
      <ProfileSidebar>
        <BoxAvatar>
          <Card sx={{ padding: '5px', display: 'flex', alignItems: 'center', background: '#fff' }}>
            <Avatar sx={{ width: '50px', height: '50px' }} src={user.anhDaiDien} />
            <Box sx={{ marginLeft: '5px' }}>
              <Username>{user.hoTen}</Username>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon style={{ color: 'gray' }} icon="ci:phone" />
                <Phone>{user.soDienThoai}</Phone>
              </Box>
            </Box>
          </Card>
        </BoxAvatar>
        <MenuBox>
          {profileSidebarConfig.map((item, index) => (
            <MenuItemProfile key={index} menu={item} />
          ))}
        </MenuBox>
      </ProfileSidebar>
      <BoxContent>
        <Outlet />
      </BoxContent>
    </RootStyle>
  );
}

export default Profile;
