import React, { useEffect, useState } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../assets/api/api';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';
import { actionGetAllNews } from '../redux/actions/newsAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '120px'
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: '20px 5%'
}));
const BoxLeft = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '5px'
}));
const WrapperLeft = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  border: `1px solid lightgrey`,
  borderRadius: '5px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px'
}));
const IconInfo = styled(Icon)(({ theme }) => ({
  width: '25px',
  height: '25px',
  color: theme.palette.main
}));
const Info = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary,
  marginLeft: '10px'
}));
const ImageNews = styled('img')(({ theme }) => ({
  width: '600px',
  height: '300px'
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  padding: '5px'
}));
const WrapperRight = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  border: `1px solid lightgrey`,
  borderRadius: '5px'
}));
const TitleRight = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary,
  marginBottom: '10px'
}));
function NewNews({ news }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
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
    <Box
      sx={{
        width: '100%',
        border: `1px solid lightgrey`,
        padding: '10px',
        height: '100%'
      }}
    >
      <Typography
        onClick={() => {
          if (news.id !== id) goToNewsDetail();
        }}
        sx={{
          fontWeight: 'bold',
          '&:hover': { color: 'gray' },
          cursor: 'pointer',
          color: id === news.id ? '#3C58C9' : 'gray'
        }}
      >
        {news.tieuDe}
      </Typography>
    </Box>
  );
}
function NewsDetail() {
  const [news, setNews] = useState();
  const { id } = useParams();
  const allNews = useSelector((state) => state.news.allNews);
  const getNewsById = async (id) => {
    const data = await axios.get(`${api}tinTuc/detail/${id}`);
    setNews(data.data);
  };
  useEffect(() => {
    getNewsById(id);
    return function () {
      return null;
    };
  }, [id]);
  if (!news) return null;
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Tin tức" />
      <BoxContent container>
        <BoxLeft item xs={12} sm={12} md={9} lg={9} xl={9}>
          <WrapperLeft>
            <Title>{news.tieuDe}</Title>
            <Box
              sx={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ImageNews src={news.hinhAnh} />
            </Box>
            <Box sx={{ marginTop: '30px' }}>
              <BoxInfo>
                <IconInfo icon="ant-design:calendar-outlined" />
                <Info>Ngày đăng: {moment(news.createAt).format(`DD/MM/YYYY`)}</Info>
              </BoxInfo>
              <BoxInfo>
                <IconInfo icon="bi:eye-fill" />
                <Info>{news.luotXem} lượt xem</Info>
              </BoxInfo>
            </Box>
            <div style={{ maxWidth: '100%' }} dangerouslySetInnerHTML={{ __html: news.noiDung }} />
          </WrapperLeft>
        </BoxLeft>
        <BoxRight item xs={12} sm={12} md={3} lg={3} xl={3}>
          <WrapperRight>
            <TitleRight>Tin tức mới nhất</TitleRight>
            {allNews.slice(0, 6).map((item, index) => (
              <NewNews key={index} news={item} />
            ))}
          </WrapperRight>
        </BoxRight>
      </BoxContent>
    </RootStyle>
  );
}

export default NewsDetail;
