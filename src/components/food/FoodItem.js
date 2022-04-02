import React, { useState } from 'react';
import { Box, Button, Card, Grid, IconButton, styled, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { keyframes } from '@emotion/react';
import api from '../../assets/api/api';

const anim = keyframes`
  from{
    transform: scale(1)
  }
  50%{
    transform: scale(1.5)
  }
  to{
    transform: scale(1)
  }
`;
const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2)
}));
const BoxFood = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.lightgrey,
  padding: theme.spacing(1)
}));
const AvatarFood = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: '20px',
  height: '300px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    height: '200px'
  }
}));
const BoxNamePrice = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const NameFood = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  margin: '10px'
}));
const PriceFood = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.main,
  fontWeight: 'bold',
  marginRight: '20px'
}));
const ButtonSeeInformation = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.second,
  marginTop: '20px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
FoodItem.prototype = {
  food: PropTypes.object
};
function FoodItem({ food }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [love, setLove] = useState(food.thich);
  const [onAnim, setOnAnim] = useState(false);
  const checkDescriptionLength = () => {
    if (food.moTa.length < 200) return `${food.moTa}`;
    return `${food.moTa.substring(0, 200)}...`;
  };
  const goToFoodDetail = () => {
    navigate(`/home/food-detail/${food.id}`);
  };
  const handleLove = () => {
    axios.get(`${api}monAn/detail/${food.id}`).then((res) => {
      if (!res.data.thich || !res.data.thich.includes(user.id)) {
        if (res.data.thich) {
          const loveNew = [...res.data.thich, user.id];
          setLove(loveNew);
          setOnAnim(true);
          axios
            .put(`${api}monAn/edit`, {
              ...food,
              thich: loveNew
            })
            .then((res) => {
              console.log('ok', res);
            })
            .catch((err) => console.log(err));
        } else {
          const loveNew = [user.id];
          setLove(loveNew);
          setOnAnim(true);
          axios
            .put(`${api}monAn/edit`, {
              ...food,
              thich: loveNew
            })
            .then((res) => {
              console.log('ok', res);
            })
            .catch((err) => console.log(err));
        }
      } else {
        const loveNew = res.data.thich.filter((love) => love !== user.id);
        setLove(loveNew);
        axios
          .put(`${api}monAn/edit`, {
            ...food,
            thich: loveNew
          })
          .then((res) => {
            console.log('un', res.data);
          });
      }
    });
  };
  return (
    <RootStyle data-aos="zoom-in" item xs={12} sm={6} md={6} lg={4} xl={4}>
      <BoxFood sx={{ '&:hover': { boxShadow: 20 } }}>
        <IconButton sx={{ width: '100%' }} disableRipple disableFocusRipple disableTouchRipple>
          <AvatarFood onClick={goToFoodDetail} src={food.hinhAnh.at(0)} />
          {loggedIn && (
            <Box>
              {love && love.includes(user.id) ? (
                <IconButton
                  onClick={handleLove}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    background: '#fff',
                    '&:hover': { background: 'lightgrey' },
                    animation: onAnim && `${anim} 2s ease`
                  }}
                >
                  <Tooltip title="Đã thích">
                    <Icon style={{ color: 'red' }} icon="ant-design:heart-filled" />
                  </Tooltip>
                </IconButton>
              ) : (
                <Tooltip title="Chưa thích">
                  <IconButton
                    onClick={handleLove}
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      background: '#fff',
                      '&:hover': { background: 'lightgrey' }
                    }}
                  >
                    <Icon style={{ color: 'gray' }} icon="ant-design:heart-filled" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}
        </IconButton>
        <BoxNamePrice>
          <NameFood>{food.tenMonAn}</NameFood>
          <PriceFood>
            <b style={{ fontSize: '20px', color: '#000' }}>Giá: </b>
            {`${food.donGia.toLocaleString('es-US')} vnđ`}
          </PriceFood>
        </BoxNamePrice>
        <Box sx={{ width: '100', display: 'flex', alignItems: 'center', padding: '0px 10px' }}>
          <Icon
            style={{ color: 'red', width: '30px', height: '30px' }}
            icon="ant-design:heart-twotone"
          />
          {!love ? (
            <Typography sx={{ color: 'gray', fontWeight: 'bold', marginLeft: '5px' }}>
              0 yêu thích
            </Typography>
          ) : (
            <Typography sx={{ color: 'gray', fontWeight: 'bold', marginLeft: '5px' }}>
              {`${love.length} yêu thích`}
            </Typography>
          )}
        </Box>
        <Typography maxHeight="120px">{checkDescriptionLength()}</Typography>
        <ButtonSeeInformation onClick={goToFoodDetail}>Xem thông tin</ButtonSeeInformation>
      </BoxFood>
    </RootStyle>
  );
}

export default FoodItem;
