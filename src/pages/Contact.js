import { Icon } from '@iconify/react';
import { Box, Button, InputBase, styled, Typography } from '@mui/material';
import React from 'react';
import Map from '../components/map/Map';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';

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
            <InputBase fullWidth sx={{ marginLeft: '10px' }} placeholder="Họ và tên của bạn" />
          </BoxInput>
          <BoxInput>
            <Icon style={{ width: '20px', height: '20px' }} icon="carbon:email" />
            <InputBase fullWidth sx={{ marginLeft: '10px' }} placeholder="Email của bạn" />
          </BoxInput>
          <BoxInput>
            <Icon style={{ width: '20px', height: '20px' }} icon="ant-design:phone-outlined" />
            <InputBase fullWidth sx={{ marginLeft: '10px' }} placeholder="Số điện thoại của bạn" />
          </BoxInput>
          <BoxInput>
            <Icon style={{ width: '20px', height: '20px' }} icon="uis:subject" />
            <InputBase fullWidth sx={{ marginLeft: '10px' }} placeholder="Tiêu đề" />
          </BoxInput>
          <BoxInput>
            <InputBase
              multiline
              fullWidth
              minRows={10}
              maxRows={10}
              sx={{ marginLeft: '10px' }}
              placeholder="Nội dung"
            />
          </BoxInput>
          <ButtonSendFeedback>Gửi phản hồi</ButtonSendFeedback>
        </BoxFeedback>
      </BoxFeedbackAndContact>
    </RootStyle>
  );
}

export default Contact;
