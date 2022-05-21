import React from 'react';
import { styled, Grid, Box, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import api from '../../assets/api/api';
import { actionGetAllNews } from '../../redux/actions/newsAction';

const RootStyle = styled(Grid)(({ theme }) => ({
  padding: '5px'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  height: '100%',
  cursor: 'pointer'
}));
const ImageNews = styled('img')(({ theme }) => ({
  width: '100%',
  height: '300px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '14px',
  marginTop: '10px'
}));
const BoxView = styled(Box)(({ theme }) => ({
  padding: '2px 5px',
  background: theme.palette.main,
  borderRadius: '20px',
  border: `1px solid #fff`,
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.white
}));
const BoxNew = styled(Typography)(({ theme }) => ({
  padding: '2px 5px',
  background: 'red',
  borderRadius: '100px',
  border: `1px solid #fff`,
  color: theme.palette.white,
  fontWeight: 'bold',
  fontSize: '12px'
}));
const BoxDate = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px'
}));
const DateCreate = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.gray,
  marginLeft: '5px'
}));
NewsItem.prototype = {
  news: PropTypes.object
};
function NewsItem({ news }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToNewsDetail = () => {
    axios.get(`${api}tinTuc/detail/${news.id}`).then((res) => {
      console.log({
        ...res.data,
        luotXem: res.data.luotXem + 1
      });
      axios
        .put(
          `${api}tinTuc/edit`,
          {
            ...res.data,
            luotXem: res.data.luotXem + 1
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        .then((res) => {
          navigate(`/home/news-detail/${news.id}`);
          dispatch(actionGetAllNews());
        });
    });
  };
  return (
    <RootStyle item xs={6} sm={6} md={6} lg={3} xl={3}>
      <Wrapper onClick={goToNewsDetail} sx={{ '&:hover': { boxShadow: 5 } }}>
        <IconButton sx={{ width: '100%' }}>
          <ImageNews src={news.hinhAnh} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'absolute',
              zIndex: 2,
              top: '10px',
              width: '100%',
              padding: '0px 10px'
            }}
          >
            <BoxView>
              <Icon style={{ width: '20px', height: '20px' }} icon="bi:eye-fill" />
              <Typography sx={{ fontSize: '12px', marginLeft: '5px' }}>{news.luotXem}</Typography>
            </BoxView>
            {new Date().getTime() - Date.parse(news.createAt) < 604800000 ? (
              <BoxNew>Mới</BoxNew>
            ) : (
              <Box> </Box>
            )}
          </Box>
        </IconButton>
        <Title>{news.tieuDe}</Title>
        <Typography sx={{ marginTop: '20px', fontSize: '14px' }}>{news.tieuDe}...</Typography>
        <BoxDate>
          <Icon
            style={{ width: '25px', height: '25px', color: 'gray' }}
            icon="ant-design:calendar-outlined"
          />
          <DateCreate>{moment(news.createAt).format(`DD/MM/YYYY`)}</DateCreate>
        </BoxDate>
      </Wrapper>
    </RootStyle>
  );
}

export default NewsItem;
