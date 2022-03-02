import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import {} from '@iconify/react';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '70%',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const TitleLoginWith = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.second,
  color: theme.palette.gray
}));
const ButtonLoginWith = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.second,
  color: theme.palette.main,
  cursor: 'pointer',
  marginLeft: '20px',
  ':hover': {
    textDecoration: 'underline'
  }
}));
function LoginWith() {
  return (
    <RootStyle>
      <TitleLoginWith>Đăng nhập bằng</TitleLoginWith>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonLoginWith>facebook</ButtonLoginWith>
        <ButtonLoginWith>google</ButtonLoginWith>
      </Box>
    </RootStyle>
  );
}

export default LoginWith;
