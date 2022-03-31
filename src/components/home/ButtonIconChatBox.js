import { Icon } from '@iconify/react';
import { Box, Card, IconButton, styled } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { keyframes } from '@emotion/react';
import { actionUserOpenChatBox } from '../../redux/actions/userAction';

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg)
//   }
//   to {
//     transform: rotate(360deg)
//   }
// `;
const ButtonIconChat = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: 999,
  bottom: 50,
  right: 50,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
  // animation: `${rotate} 2s infinite alternate`
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
    <ButtonIconChat>
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
