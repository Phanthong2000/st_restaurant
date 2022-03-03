import React, { useEffect, useState } from 'react';
import { Badge, Box, Card, IconButton, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
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
  zIndex: 999
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
  const [navbar, setNavbar] = useState(false);
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
  if (pathname !== '/home/app')
    return (
      <RootStyle data-aos="fade-down" sx={{ background: '#fff' }}>
        <Logo sx={{ color: '#3C58C9' }}>ST Restaurant</Logo>
        <BoxMenu>
          <Responsive width="mdDown">
            {navbarConfig.map((item, index) => (
              <MenuItem navbar key={index} menu={item} />
            ))}
          </Responsive>
          <Responsive width="mdUp">
            <IconButton sx={{ marginRight: '10px' }}>
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
          <IconButton sx={{ color: '#fff' }}>
            <Badge badgeContent={1} color="error">
              <Icon
                style={{ width: '30px', height: '30px', color: 'gray' }}
                icon="ant-design:shopping-cart-outlined"
              />
            </Badge>
          </IconButton>
        </BoxMenu>
      </RootStyle>
    );
  return (
    <RootStyle data-aos={navbar && 'fade-down'} sx={{ background: navbar && '#fff' }}>
      <Logo sx={{ color: navbar && '#3C58C9' }}>ST Restaurant</Logo>
      <BoxMenu>
        <Responsive width="mdDown">
          {navbarConfig.map((item, index) => (
            <MenuItem navbar={navbar} key={index} menu={item} />
          ))}
        </Responsive>
        <Responsive width="mdUp">
          <IconButton sx={{ marginRight: '10px' }}>
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
        <IconButton sx={{ color: '#fff' }}>
          <Badge badgeContent={1} color="error">
            <Icon
              style={{ width: '30px', height: '30px', color: navbar && 'gray' }}
              icon="ant-design:shopping-cart-outlined"
            />
          </Badge>
        </IconButton>
      </BoxMenu>
    </RootStyle>
  );
}

export default HomeNavbar;
