import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import {} from '@iconify/react';
import PropTypes from 'prop-types';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 10),
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.background
}));
const BreadcrumbsPage = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.white,
  fontSize: '14px',
  marginRight: '5px'
}));
BoxBreadcrumbs.prototype = {
  name: PropTypes.string
};
function BoxBreadcrumbs({ name }) {
  return (
    <RootStyle>
      <BreadcrumbsPage sx={{ cursor: 'pointer' }}>Trang chủ</BreadcrumbsPage>
      <BreadcrumbsPage>/</BreadcrumbsPage>
      <BreadcrumbsPage>{name}</BreadcrumbsPage>
    </RootStyle>
  );
}

export default BoxBreadcrumbs;
