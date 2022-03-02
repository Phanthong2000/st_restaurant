import React from 'react';
import { Box, styled } from '@mui/material';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '55%',
  height: '100%',
  backgroundImage: `url(https://www.discoverlosangeles.com/sites/default/files/images/2019-01/laxbw-prime-1715-hor-wide.jpg?width=1600&height=1200&fit=crop&quality=78&auto=webp)`,
  borderRadius: '0px 20px 20px 0px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));
function AuthSlide() {
  return <RootStyle> </RootStyle>;
}

export default AuthSlide;
