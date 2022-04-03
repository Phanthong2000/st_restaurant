import { Icon } from '@iconify/react';
import { Box, Button, InputBase, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionUserSnackbar } from '../redux/actions/userAction';
import api from '../assets/api/api';
import Map from '../components/map/Map';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';
import { sendFeedbackSocket } from '../util/wssConnection';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '120px',
  backgroundImage:
    'url(https://media.cntraveler.com/photos/5c1bc77ca546ef283d217380/16:9/w_2560,c_limit/St.-Lawrence_DSCF9164.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  backgroundAttachment: 'fixed'
  // backgroundPosition: `center bottom`
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '50px',
  color: theme.palette.white,
  fontFamily: theme.typography.primary
}));
const BoxFeedbackAndContact = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(10, 10),
  background: theme.palette.background,
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    padding: theme.spacing(2, 5)
  }
}));
const BoxContact = styled(Box)(({ theme }) => ({
  width: '35%',
  background: theme.palette.black,
  padding: '10px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const AvatarContact = styled('img')(() => ({
  width: '100%',
  height: '400px'
}));
const IconContact = styled(Icon)(({ theme }) => ({
  color: theme.palette.white,
  width: '25px',
  height: '25px',
  cursor: 'pointer',
  marginRight: '10px'
}));
const BoxFeedback = styled(Box)(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const TitleFeedback = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  color: theme.palette.white,
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '70%',
  background: theme.palette.white,
  padding: theme.spacing(0.5, 2),
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  marginLeft: '10%',
  marginTop: '20px'
}));
const ButtonSendFeedback = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  marginTop: '20px',
  marginLeft: '10%',
  padding: theme.spacing(1, 4),
  fontSize: '16px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function BoxInformation({ icon, title, information }) {
  const BoxInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: '5px'
  }));
  const IconInfo = styled(Icon)(({ theme }) => ({
    width: '20px',
    height: '20px',
    color: theme.palette.white
  }));
  return (
    <BoxInfo>
      <Box sx={{ width: '10%' }}>
        <IconInfo icon={icon} />
      </Box>
      <Typography
        sx={{ color: '#fff', fontSize: '12px', marginLeft: '5px', width: '90%' }}
      >{`${title}: ${information}`}</Typography>
    </BoxInfo>
  );
}
function Contact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const broadcast = useSelector((state) => state.socket.broadcast);
  const sendFeedback = () => {
    if (!fullname.match(`^.{1,}`)) {
      setError('Họ và tên không hợp lệ');
    } else if (!validator.isEmail(email)) {
      setError('Email không hợp lệ');
    } else if (!phone.match(`^0[0-9]{8,10}$`)) {
      setError('Số điện thoại không hợp lệ');
    } else if (!subject.match(`^.{1,}`)) {
      setError('Tiêu đề không hợp lệ');
    } else if (!content.match(`^.{1,}`)) {
      setError('Nội dung không hợp lệ');
    } else {
      setError('');
      const allSocketAdmin = [];
      broadcast.forEach((broad) => {
        if (broad.type === 'admin') {
          allSocketAdmin.push(broad.socketId);
        }
      });
      axios
        .post(`${api}phanHoi/create`, {
          hoTen: fullname,
          email,
          soDienThoai: phone,
          tieuDe: subject,
          noiDung: content,
          trangThai: 'Chưa đọc'
        })
        .then((res) => {
          sendFeedbackSocket({ socketIds: allSocketAdmin, feedback: res.data });
          navigate(`/home/app`);
          dispatch(
            actionUserSnackbar({
              status: true,
              content: 'Gửi phản hồi thanh công'
            })
          );
        });
    }
  };
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Liên hệ" />
      <BoxTitle>
        <Title>LIÊN HỆ</Title>
      </BoxTitle>
      <Map />
      <BoxFeedbackAndContact>
        <BoxContact>
          <AvatarContact src="https://cdn.broadsheet.com.au/cache/ee/59/ee5913ff25171675a6e1dc213933c36a.jpg" />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              marginTop: '10px'
            }}
          >
            <IconContact icon="simple-line-icons:social-facebook" />
            <IconContact icon="uit:youtube" />
            <IconContact icon="ph:instagram-logo" />
          </Box>
          <Box>
            <BoxInformation
              icon="ic:round-email"
              title="Email"
              information="phanthong2k000@gmail.com"
            />
            <BoxInformation
              icon="ps:facebook-places"
              title="Địa chỉ"
              information="1/11/46 Đặng Thuỳ Trâm, phường 13, quận Bình Thạnh, Thành phố Hồ Chí Minh"
            />
            <BoxInformation icon="ci:phone" title="Điện thoại" information="097.102.69.10" />
          </Box>
        </BoxContact>
        <BoxFeedback>
          <TitleFeedback>Phản hồi</TitleFeedback>
          <BoxInput>
            <Icon style={{ width: '20px', height: '20px' }} icon="fa:user-o" />
            <InputBase
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              fullWidth
              sx={{ marginLeft: '10px' }}
              placeholder="Họ và tên của bạn"
            />
          </BoxInput>
          <BoxInput>
            <Icon style={{ width: '20px', height: '20px' }} icon="carbon:email" />
            <InputBase
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ marginLeft: '10px' }}
              placeholder="Email của bạn"
            />
          </BoxInput>
          <BoxInput>
            <Icon style={{ width: '20px', height: '20px' }} icon="ant-design:phone-outlined" />
            <InputBase
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              sx={{ marginLeft: '10px' }}
              placeholder="Số điện thoại của bạn"
            />
          </BoxInput>
          <BoxInput>
            <Icon style={{ width: '20px', height: '20px' }} icon="uis:subject" />
            <InputBase
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              sx={{ marginLeft: '10px' }}
              placeholder="Tiêu đề"
            />
          </BoxInput>
          <BoxInput>
            <InputBase
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              fullWidth
              minRows={7}
              maxRows={7}
              sx={{ marginLeft: '10px' }}
              placeholder="Nội dung"
            />
          </BoxInput>
          <Typography sx={{ color: 'red', marginTop: '10px', marginLeft: '10%' }}>
            {error}
          </Typography>
          <ButtonSendFeedback onClick={sendFeedback}>Gửi phản hồi</ButtonSendFeedback>
        </BoxFeedback>
      </BoxFeedbackAndContact>
    </RootStyle>
  );
}

export default Contact;
