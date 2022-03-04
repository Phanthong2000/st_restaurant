import { Box, styled } from '@mui/material';
import React from 'react';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '120px',
  background: theme.palette.background
}));
function Order() {
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Đặt bàn" />
    </RootStyle>
  );
}

export default Order;
