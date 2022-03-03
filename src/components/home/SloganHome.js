import React from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RootStyle = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: '5% 10%',
  alignItems: 'center'
}));
const BoxSlogan = styled(Typography)(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '70%'
  }
}));
const Slogan = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.white,
  [theme.breakpoints.down('md')]: {
    fontSize: '14px'
  }
}));
const ImageSlogan = styled('img')(({ theme }) => ({
  width: '300px',
  height: '300px',
  borderRadius: '20px',
  [theme.breakpoints.down('md')]: {
    width: '150px',
    height: '150px'
  }
}));
SloganHome.prototype = {
  slogan: PropTypes.object,
  index: PropTypes.number
};
function SloganHome({ slogan, index }) {
  return (
    <RootStyle
      data-aos={index % 2 === 0 ? 'fade-up-right' : 'fade-up-left'}
      direction={index % 2 === 0 ? 'row' : 'row-reverse'}
    >
      <BoxSlogan>
        <Slogan>{slogan.slogan}</Slogan>
      </BoxSlogan>
      <Box sx={index % 2 === 0 ? { marginLeft: '50px' } : { marginRight: '50px' }}>
        <ImageSlogan src={slogan.image} />
      </Box>
    </RootStyle>
  );
}

export default SloganHome;
