import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '20px'
}));
const WrapperName = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  padding: '10px 0px'
}));
const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px',
  fontFamily: theme.typography.fontFamily.primary
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
    <RootStyle onClick={goToPath}>
      <WrapperName sx={{ background: pathname.includes(menu.path) && '#D9DDE9' }}>
        <Name>{menu.name}</Name>
      </WrapperName>
    </RootStyle>
  );
}

export default MenuItemProfile;
