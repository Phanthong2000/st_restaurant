import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, styled, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { actionGetAllNews } from '../redux/actions/newsAction';
import api from '../assets/api/api';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '120px',
  backgroundImage:
    'url(https://a.cdn-hotels.com/gdcs/production78/d659/bf01c29d-eab1-4443-93e0-142ce5c6836b.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  backgroundAttachment: 'fixed'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '20px 10%',
  display: 'flex',
  justifyContent: 'space-between'
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: '20px 5%'
}));
const BoxLeft = styled(Grid)(({ theme }) => ({
  padding: '5px'
}));
const WrapperLeft = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  border: `1px solid lightgrey`,
  borderRadius: '5px'
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  padding: '5px'
}));
const ButtonPage = styled(Box)(({ theme }) => ({
  border: `1px solid lightgrey`,
  width: '35px',
  height: '35px',
  background: theme.palette.background,
  color: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}));
const IconPage = styled(Icon)(({ theme }) => ({
  width: '20px',
  height: '20px'
}));
const Page = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary,
  marginLeft: '10px'
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
function NewsItem({ news }) {
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
    <RootStyle item xs={6} sm={6} md={6} lg={4} xl={4}>
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
function NewNews({ news }) {
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
    <Box
      sx={{
        width: '100%',
        border: `1px solid lightgrey`,
        padding: '10px',
        height: '100%'
      }}
    >
      <Typography
        onClick={goToNewsDetail}
        sx={{ fontWeight: 'bold', '&:hover': { color: 'gray' }, cursor: 'pointer' }}
      >
        {news.tieuDe}
      </Typography>
    </Box>
  );
}
function News() {
  const allNews = useSelector((state) => state.news.allNews);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const getNewsByPage = (page) => {
    const data = [];
    for (let i = 0; i < allNews.length; i += 1) {
      if (i >= page * 3 && i < page * 3 + 3) data.push(allNews.at(i));
    }
    setNews(data);
  };
  useEffect(() => {
    getNewsByPage(0);
    setPage(0);
    return function () {
      return null;
    };
  }, [allNews]);
  const checkPage = () => {
    const page = (allNews.length / 3)
      .toString()
      .substring(
        (allNews.length / 3).toFixed(1).toString().indexOf('.') + 1,
        (allNews.length / 3).toFixed(1).toString().length
      );
    if (parseInt(page, 10) > 0)
      return (
        parseInt(
          ((allNews.length - 1) / 3)
            .toString()
            .substring(0, ((allNews.length - 1) / 3).toFixed(1).toString().indexOf('.')),
          10
        ) + 1
      );
    return parseInt(
      ((allNews.length - 1) / 3)
        .toString()
        .substring(0, ((allNews.length - 1) / 3).toFixed(1).toString().indexOf('.')),
      10
    );
  };
  const handleNextPage = () => {
    if (page + 1 < checkPage()) {
      getNewsByPage(page + 1);
      setPage(page + 1);
    }
  };
  const handlePrevPage = () => {
    if (page > 0) {
      getNewsByPage(page - 1);
      setPage(page - 1);
    }
  };
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Tin tức" />
      <BoxTitle>
        <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: '40px', width: '40%' }}>
          Giới thiệu
        </Typography>
        <Typography sx={{ width: '60%', color: '#fff' }}>
          Tổng hợp tất cả các sự kiện quan trọng và khuyến mãi dành cho khách hàng của ST
          Restaurant. Chương trình khách hàng thân thiết và những quyền lợi đặc biệt đối với những
          người đồng hành cùng ST Restaurant trong nhiều năm qua.
        </Typography>
      </BoxTitle>
      <BoxContent container>
        <BoxLeft item xs={12} sm={12} md={9} lg={9} xl={9}>
          <WrapperLeft container>
            {news.map((item, index) => (
              <NewsItem key={index} news={item} />
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px', width: '100%' }}>
              <ButtonPage onClick={handlePrevPage}>
                <IconPage icon="charm:chevrons-left" />
              </ButtonPage>
              <Page>{page + 1}</Page>
              <ButtonPage onClick={handleNextPage} sx={{ marginLeft: '10px' }}>
                <IconPage icon="charm:chevrons-right" />
              </ButtonPage>
              <Page>{page + 1}</Page>
              <Page> - </Page>
              <Page>{checkPage()}</Page>
            </Box>
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

export default News;
