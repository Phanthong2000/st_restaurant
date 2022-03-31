import React from 'react';
import { Box, Card, IconButton, Stack, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { actionUserOpenChatBox } from '../../redux/actions/userAction';

const RootStyle = styled(Card)(({ theme }) => ({
  width: '300px',
  height: '400px',
  position: 'fixed',
  bottom: 5,
  right: 150,
  zIndex: 999,
  background: theme.palette.white
}));
const BoxHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.main,
  padding: theme.spacing(1)
}));
function ChatBox() {
  const dispatch = useDispatch();
  const hiddenChatBox = () => {
    dispatch(actionUserOpenChatBox(false));
  };
  return (
    <RootStyle data-aos="fade-up-left">
      <BoxHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            style={{ width: '40px', height: '40px' }}
            icon="flat-color-icons:customer-support"
          />
          <Typography sx={{ color: '#fff', marginLeft: '10px' }}>Nhắn tin với nhà hàng</Typography>
        </Box>
        <IconButton onClick={hiddenChatBox}>
          <Icon style={{ color: '#fff' }} icon="fa-solid:minus" />
        </IconButton>
      </BoxHeader>
    </RootStyle>
  );
}

export default ChatBox;
