import React from 'react';
import { Box, Divider, Stack, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  padding: theme.spacing(0, 10),
  background: '#000',
  [theme.breakpoints.down('md')]: {
    padding: (0, 0),
    display: 'block'
  }
}));
const BoxContact = styled(Box)(({ theme }) => ({
  width: '30%',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const BoxAbout = styled(Box)(({ theme }) => ({
  width: '40%',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const BoxSupport = styled(Box)(({ theme }) => ({
  width: '30%',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const IconContact = styled(Icon)(({ theme }) => ({
  color: theme.palette.gray,
  width: '25px',
  height: '25px',
  cursor: 'pointer',
  marginRight: '10px'
}));
const LogoSaleNotify = styled('img')(() => ({
  width: '150px',
  height: '70px',
  marginTop: '20px'
}));
const BoxCopyRight = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '20px 50px',
  background: '#000',
  [theme.breakpoints.down('md')]: {
    padding: '10px 20px'
  }
}));
function BoxInformation({ icon, title, information }) {
  const BoxInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: '20px'
  }));
  const IconInfo = styled(Icon)(({ theme }) => ({
    width: '30px',
    height: '30px',
    color: theme.palette.gray
  }));
  return (
    <BoxInfo>
      <Box sx={{ width: '10%' }}>
        <IconInfo icon={icon} />
      </Box>
      <Typography
        sx={{ color: 'gray', fontSize: '14px', marginLeft: '5px', width: '90%' }}
      >{`${title}: ${information}`}</Typography>
    </BoxInfo>
  );
}
function HomeBottom() {
  return (
    <>
      <RootStyle direction="row">
        <BoxContact>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}
          >
            LI??N H???
          </Typography>
          <BoxInformation
            icon="ic:round-email"
            title="Email"
            information="phanthong2k000@gmail.com"
          />
          <BoxInformation
            icon="ps:facebook-places"
            title="?????a ch???"
            information="1/11/46 ?????ng Thu??? Tr??m, ph?????ng 13, qu???n B??nh Th???nh, Th??nh ph??? H??? Ch?? Minh"
          />
          <BoxInformation icon="ci:phone" title="??i???n tho???i" information="097.102.69.10" />
        </BoxContact>
        <Divider sx={{ background: '#fff', width: '1px' }} />
        <BoxAbout>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}
          >
            V??? CH??NG T??I
          </Typography>
          <Typography sx={{ color: 'gray', fontSize: '14px' }}>
            N???m gi???a ???? th??? hi???n ?????i, ST Restaurant l???i mang ?????n c???m gi??c th??n thu???c, d??n d?? cho
            th???c kh??ch ngay khi ?????t ch??n v??o c???a. Qu??n ph???c v??? c??c m??n ??n d??n d??, ?????c s???n Nam B???.
          </Typography>
          <Box sx={{ margin: '30px 0px' }}>
            <IconContact icon="simple-line-icons:social-facebook" />
            <IconContact icon="uit:youtube" />
            <IconContact icon="ph:instagram-logo" />
          </Box>
          <Typography sx={{ color: 'gray', fontSize: '14px' }}>
            Gi????y ch????ng nh?????n ??a??ng ki?? kinh doanh s???? 0123456789 do S???? k???? hoa??ch va?? ??????u tu??. Tha??nh ph???? H????
            Chi?? Minh c????p nga??y 03/03/2022.
          </Typography>
          <LogoSaleNotify src="https://d1-concepts.com/wp-content/uploads/2021/03/logoSaleNoti.png" />
        </BoxAbout>
        <Divider sx={{ background: '#fff', width: '1px' }} />
        <BoxSupport>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}
          >
            H??? TR??? V?? CH??NH S??CH
          </Typography>
          <Typography sx={{ color: 'gray', fontSize: '14px' }}>
            - Quy ch??? ho???t ?????ng v?? Ch??nh s??ch b???o m???t.
          </Typography>
          <Typography sx={{ color: 'gray', fontSize: '14px' }}>- Ch??nh s??ch thanh to??n.</Typography>
          <Typography sx={{ color: 'gray', fontSize: '14px' }}>- Ch??nh s??ch ?????i tr???.</Typography>
        </BoxSupport>
      </RootStyle>
      <BoxCopyRight>
        <Divider sx={{ background: '#fff', width: '100%', marginTop: '20px' }} />
        <Typography sx={{ color: 'gray', fontSize: '16px', marginTop: '10px' }}>
          ??ST Restaurant 2022 | All rights reserved. Website by Phan Van Thong
        </Typography>
      </BoxCopyRight>
    </>
  );
}

export default HomeBottom;
