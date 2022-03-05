import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  background: theme.palette.background,
  cursor: 'pointer'
}));
const Space1 = styled('div')(({ theme }) => ({
  height: '30px',
  background: theme.palette.background,
  borderBottomRightRadius: '30px',
  width: '100%'
}));
const Space2 = styled('div')(({ theme }) => ({
  height: '30px',
  background: theme.palette.background,
  borderTopRightRadius: '30px',
  width: '100%'
}));
const WrapperName = styled(Box)(({ theme }) => ({
  background: theme.palette.background,
  width: '90%',
  marginLeft: '10%',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  borderTopLeftRadius: '70px',
  borderBottomLeftRadius: '70px',
  justifyContent: 'center'
}));
const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px'
}));
MenuItemProfile.prototype = {
  menu: PropTypes.object
};
function MenuItemProfile({ menu }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goToPath = () => {
    navigate(`${menu.path}`);
  };
  return (
    <>
      {pathname.includes(menu.path) && <Space1 />}
      <RootStyle onClick={goToPath}>
        <WrapperName sx={{ background: pathname.includes(menu.path) && '#D9DDE9' }}>
          <Name
            sx={{
              color: pathname.includes(menu.path) ? '#000' : '#fff'
            }}
          >
            {menu.name}
          </Name>
        </WrapperName>
      </RootStyle>
      {pathname.includes(menu.path) && <Space2 />}
    </>
  );
}

export default MenuItemProfile;
