import React from 'react';
import { styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const RootStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.white,
  fontFamily: 'inherit',
  fontSize: '14px',
  marginRight: '20px',
  textTransform: 'uppercase',
  cursor: 'pointer'
}));
MenuItem.prototype = {
  menu: PropTypes.object,
  navbar: PropTypes.bool
};
function MenuItem({ menu, navbar }) {
  const { pathname } = useLocation();
  if (pathname === menu.path)
    return <RootStyle sx={{ color: '#3C58C9', fontWeight: 'bold' }}>{menu.title}</RootStyle>;
  return <RootStyle sx={navbar && { color: 'gray' }}>{menu.title}</RootStyle>;
}

export default MenuItem;
