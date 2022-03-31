import React, { useEffect, useState } from 'react';
import { Avatar, Box, styled, Tooltip, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserOpenChatBox } from '../../redux/actions/userAction';
import { actionAuthLoggedIn } from '../../redux/actions/authAction';
import UtilRedux from '../../util/UtilRedux';

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
  const navigate = useNavigate();
  const showToast = useSelector((state) => state.user.showToast);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [user, setUser] = useState({});
  const userLogin = useSelector((state) => state.user.user);
  const notify = (type, content) => {
    if (type === 'error') {
      return toast.error(<ToastDisplay content={content} />);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (loggedIn) {
      // setUser(JSON.parse(localStorage.getItem('user')));
      setUser(userLogin);
    }
    Aos.init({ duration: 1000 });
    return function () {
      return null;
    };
  }, [userLogin]);
  useEffect(() => {
    if (showToast.content !== '') notify(showToast.type, showToast.content);
    return function () {
      return null;
    };
  }, [showToast]);
  const goToLogin = () => {
    navigate('/login');
  };
  const goToProfile = () => {
    navigate('/home/profile');
  };
  const logout = () => {
    localStorage.removeItem('user');
    dispatch(actionAuthLoggedIn(false));
    navigate('/login');
  };
  if (user.id === undefined && loggedIn) return null;
  return (
    <RootStyle>
      <BoxContact>
        <Tooltip title="Facebook">
          <IconContact icon="simple-line-icons:social-facebook" />
        </Tooltip>
        <Tooltip title="Youtube">
          <IconContact icon="uit:youtube" />
        </Tooltip>
        <Tooltip title="Instagram">
          <IconContact icon="ph:instagram-logo" />
        </Tooltip>
      </BoxContact>
      {loggedIn ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Xem thông tin cá nhân">
            <Box
              onClick={goToProfile}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginRight: '20px'
              }}
            >
              <Avatar sx={{ width: '30px', height: '30px' }} src={user.anhDaiDien} />
              <Typography sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
                {user.hoTen.substring(user.hoTen.lastIndexOf(' '), user.hoTen.length)}
              </Typography>
            </Box>
          </Tooltip>
          <Box
            onClick={logout}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'red',
              padding: '5px',
              borderRadius: '10px'
            }}
          >
            <IconContact
              style={{ marginRight: '5px', color: '#fff' }}
              icon="ant-design:logout-outlined"
            />
            <Typography
              sx={{ color: '#fff', fontSize: '11px', fontFamily: 'sans-serif', marginTop: '5px' }}
            >
              ĐĂNG XUẤT
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          onClick={goToLogin}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <IconContact style={{ marginRight: '5px' }} icon="fa:user-o" />
          <Typography
            sx={{ color: 'gray', fontSize: '11px', fontFamily: 'sans-serif', marginTop: '5px' }}
          >
            ĐĂNG NHẬP
          </Typography>
        </Box>
      )}
      <Toaster />
    </RootStyle>
  );
}

export default HomeNavbarHeader;
