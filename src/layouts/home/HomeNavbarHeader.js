import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserOpenChatBox } from '../../redux/actions/userAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '40px',
  padding: '0px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  background: theme.palette.white,
  borderBottom: `1px solid lightgrey`,
  zIndex: 999
}));
const BoxContact = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));
const IconContact = styled(Icon)(({ theme }) => ({
  color: theme.palette.gray,
  width: '20px',
  height: '20px',
  cursor: 'pointer',
  marginRight: '10px'
}));
function ToastDisplay({ content }) {
  return (
    <Box sx={{ zIndex: '200' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>{content}</Typography>
    </Box>
  );
}
function HomeNavbarHeader() {
  const showToast = useSelector((state) => state.user.showToast);
  const notify = (type, content) => {
    if (type === 'error') {
      return toast.error(<ToastDisplay content={content} />);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init({ duration: 1000 });
    return function () {
      return null;
    };
  }, []);
  useEffect(() => {
    if (showToast.content !== '') notify(showToast.type, showToast.content);
    return function () {
      return null;
    };
  }, [showToast]);
  return (
    <RootStyle>
      <BoxContact>
        <IconContact icon="simple-line-icons:social-facebook" />
        <IconContact icon="uit:youtube" />
        <IconContact icon="ph:instagram-logo" />
      </BoxContact>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <IconContact style={{ marginRight: '5px' }} icon="fa:user-o" />
        <Typography
          sx={{ color: 'gray', fontSize: '11px', fontFamily: 'sans-serif', marginTop: '5px' }}
        >
          ĐĂNG NHẬP
        </Typography>
      </Box>
      <Toaster />
    </RootStyle>
  );
}

export default HomeNavbarHeader;
