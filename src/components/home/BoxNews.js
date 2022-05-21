import React from 'react';
import { Box, Button, Divider, Grid, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewsItem from './NewsItem';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '20px 10%',
  background: theme.palette.white
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  color: theme.palette.gray,
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
const ButtonWatchMore = styled(Box)(({ theme }) => ({
  padding: '5px 30px',
  fontSize: '14px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  background: theme.palette.white,
  border: `1px solid #000`,
  cursor: 'pointer',
  ':hover': {
    background: 'lightgrey'
  }
}));
function BoxNews() {
  const allNews = useSelector((state) => state.news.allNews);
  const navigate = useNavigate();
  const goToNews = () => {
    navigate('/home/news');
  };
  return (
    <RootStyle>
      <Title>Tin tức</Title>
      <Divider sx={{ margin: '10px 0px', background: '#000' }} />
      <BoxContent container>
        {allNews.slice(0, 4).map((item, index) => (
          <NewsItem key={index} news={item} />
        ))}
      </BoxContent>
      <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', marginTop: '20px' }}>
        <ButtonWatchMore onClick={goToNews}>Xem thêm</ButtonWatchMore>
      </Box>
    </RootStyle>
  );
}

export default BoxNews;
