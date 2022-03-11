import React, { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Card,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  styled,
  Typography
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import navbarConfig from './NavbarConfig';
import MenuItem from '../../components/home/MenuItem';
import Responsive from '../../components/Reponsive';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '80px',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
  top: 40,
  zIndex: 100
}));
const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  color: theme.palette.white,
  fontFamily: theme.typography.fontFamily.second,
  cursor: 'pointer'
}));
const BoxMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
function HomeNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const scrollNavbar = () => {
    if (window.scrollY >= heightScreen - 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollNavbar);
    return () => {
      window.removeEventListener('scroll', scrollNavbar);
    };
  }, []);
  const goToHome = () => {
    navigate('/home/app');
  };
  const scrollTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };
  if (pathname !== '/home/app')
    return (
      <RootStyle data-aos="fade-down" sx={{ background: '#fff' }}>
        <Logo onClick={goToHome} sx={{ color: '#3C58C9' }}>
          ST Restaurant
        </Logo>
        <BoxMenu>
          <Responsive width="mdDown">
            {navbarConfig.map((item, index) => (
              <MenuItem navbar key={index} menu={item} />
            ))}
          </Responsive>
          <Responsive width="mdUp">
            <IconButton onClick={() => setOpenDrawer(true)} sx={{ marginRight: '10px' }}>
              <Icon
                style={{
                  width: '50px',
                  height: '50px',
                  color: 'gray'
                }}
                icon="line-md:menu"
              />
            </IconButton>
          </Responsive>
        </BoxMenu>
        <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <List sx={{ background: '#fff', height: '100%', width: '200px' }}>
            {navbarConfig.map((item, index) => (
              <ListItem sx={{ width: '100%' }} key={index}>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    setOpenDrawer(false);
                  }}
                  sx={{
                    textAlign: 'center',
                    width: '100%',
                    background: pathname.includes(item.path) && '#3C58C9',
                    '&:hover': {
                      background: pathname.includes(item.path) && '#4d91f7'
                    }
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: 'center',
                      width: '100%',
                      color: pathname.includes(item.path) && '#fff'
                    }}
                  >
                    {item.title}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </RootStyle>
    );
  return (
    <RootStyle data-aos={navbar && 'fade-down'} sx={{ background: navbar && '#fff' }}>
      <Logo onClick={scrollTop} sx={{ color: navbar && '#3C58C9' }}>
        ST Restaurant
      </Logo>
      <BoxMenu>
        <Responsive width="mdDown">
          {navbarConfig.map((item, index) => (
            <MenuItem navbar={navbar} key={index} menu={item} />
          ))}
        </Responsive>
        <Responsive width="mdUp">
          <IconButton onClick={() => setOpenDrawer(true)} sx={{ marginRight: '10px' }}>
            <Icon
              style={{
                width: '50px',
                height: '50px',
                color: navbar ? 'gray' : '#fff'
              }}
              icon="line-md:menu"
            />
          </IconButton>
        </Responsive>
      </BoxMenu>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ background: '#fff', height: '100%', width: '200px' }}>
          {navbarConfig.map((item, index) => (
            <ListItem sx={{ width: '100%' }} key={index}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setOpenDrawer(false);
                }}
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  background: pathname.includes(item.path) && '#3C58C9',
                  '&:hover': {
                    background: pathname.includes(item.path) && '#4d91f7'
                  }
                }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    width: '100%',
                    color: pathname.includes(item.path) && '#fff'
                  }}
                >
                  {item.title}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </RootStyle>
  );
}

export default HomeNavbar;
