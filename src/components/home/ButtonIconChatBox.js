import { Icon } from '@iconify/react';
import { Box, Card, IconButton, styled } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionUserOpenChatBox } from '../../redux/actions/userAction';

const ButtonIconChat = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: 999,
  bottom: 30,
  right: 30,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const IconChat = styled(Icon)(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: theme.palette.white
}));
function ButtonIconChatBox() {
  const dispatch = useDispatch();
  const chooseChatBox = () => {
    dispatch(actionUserOpenChatBox(true));
  };
  return (
    <ButtonIconChat data-aos="fade-up" sx={{ width: '100px', height: '100px' }}>
      <Box
        onClick={chooseChatBox}
        sx={{
          width: '50px',
          height: '50px',
          background: '#3C58C9',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '50px',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <IconChat icon="bxl:messenger" />
      </Box>
    </ButtonIconChat>
  );
}

export default ButtonIconChatBox;
