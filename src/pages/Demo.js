import React from 'react';
import { Box, Card, Popper, styled, Typography } from '@mui/material';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.lightgrey,
  minHeight: `${heightScreen}px`
}));
const Navbar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '80px',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 3)
}));
const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  color: theme.palette.main
}));
const MainMenu = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.gray,
  marginRight: '20px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  ':hover': {
    color: theme.palette.main
  }
}));
const BoxMainMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
const ExtraMenu = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.gray,
  cursor: 'pointer',
  ':hover': {
    color: theme.palette.background
  }
}));
function Demo() {
  const [openSearch, setOpenSearch] = React.useState(false);
  const [anchorElSearch, setAnchorElSearch] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [anchorElEdit, setAnchorElEdit] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const [openHandle, setOpenHandle] = React.useState(false);
  const [anchorElHandle, setAnchorElHandle] = React.useState(null);
  const [openSystem, setOpenSystem] = React.useState(false);
  const [anchorElSystem, setAnchorElSystem] = React.useState(null);
  const handleClickSearch = (event) => {
    setAnchorElSearch(event.currentTarget);
    setOpenSearch((pre) => !pre);
    setOpenEdit(false);
    setOpenHandle(false);
    setOpenMenu(false);
    setOpenSystem(false);
  };
  const handleClickEdit = (event) => {
    setAnchorElEdit(event.currentTarget);
    setOpenEdit((pre) => !pre);
    setOpenSearch(false);
    setOpenHandle(false);
    setOpenMenu(false);
    setOpenSystem(false);
  };
  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
    setOpenMenu((pre) => !pre);
    setOpenEdit(false);
    setOpenHandle(false);
    setOpenSearch(false);
    setOpenSystem(false);
  };
  const handleClickHandle = (event) => {
    setAnchorElHandle(event.currentTarget);
    setOpenHandle((pre) => !pre);
    setOpenEdit(false);
    setOpenSearch(false);
    setOpenMenu(false);
    setOpenSystem(false);
  };
  const handleClickSystem = (event) => {
    setAnchorElSystem(event.currentTarget);
    setOpenSystem((pre) => !pre);
    setOpenEdit(false);
    setOpenHandle(false);
    setOpenMenu(false);
    setOpenSearch(false);
  };
  return (
    <RootStyle>
      <Navbar>
        <Logo>ST Restaurant</Logo>
        <BoxMainMenu>
          <MainMenu sx={{ color: openSearch && '#3C58C9' }} onClick={handleClickSearch}>
            T??m ki???m
          </MainMenu>
          <Popper open={openSearch} anchorEl={anchorElSearch} placement="bottom-start">
            <Card sx={{ background: '#fff', padding: '10px' }}>
              <ExtraMenu>M??n ??n</ExtraMenu>
              <ExtraMenu sx={{ marginTop: '10px' }}>????n ?????t b??n</ExtraMenu>
            </Card>
          </Popper>
          <MainMenu sx={{ color: openEdit && '#3C58C9' }} onClick={handleClickEdit}>
            C???p nh???t
          </MainMenu>
          <Popper open={openEdit} anchorEl={anchorElEdit} placement="bottom-start">
            <Card sx={{ background: '#fff', padding: '10px' }}>
              <ExtraMenu>T???o ????n ?????t b??n</ExtraMenu>
              <ExtraMenu sx={{ marginTop: '10px' }}>Th??ng tin c?? nh??n</ExtraMenu>
            </Card>
          </Popper>
          <MainMenu sx={{ color: openMenu && '#3C58C9' }} onClick={handleClickMenu}>
            Danh m???c
          </MainMenu>
          <Popper open={openMenu} anchorEl={anchorElMenu} placement="bottom-start">
            <Card sx={{ background: '#fff', padding: '10px' }}>
              <ExtraMenu>Lo???i m??n ??n</ExtraMenu>
            </Card>
          </Popper>
          <MainMenu sx={{ color: openHandle && '#3C58C9' }} onClick={handleClickHandle}>
            X??? l??
          </MainMenu>
          <Popper open={openHandle} anchorEl={anchorElHandle} placement="bottom-start">
            <Card sx={{ background: '#fff', padding: '10px' }}>
              <ExtraMenu>Thanh to??n ho?? ????n</ExtraMenu>
            </Card>
          </Popper>
          <MainMenu sx={{ color: openSystem && '#3C58C9' }} onClick={handleClickSystem}>
            H??? th???ng
          </MainMenu>
          <Popper open={openSystem} anchorEl={anchorElSystem} placement="bottom-start">
            <Card sx={{ background: '#fff', padding: '10px' }}>
              <ExtraMenu>Gi???i thi???u</ExtraMenu>
              <ExtraMenu sx={{ marginTop: '10px' }}>Li??n h???</ExtraMenu>
            </Card>
          </Popper>
        </BoxMainMenu>
      </Navbar>
    </RootStyle>
  );
}

export default Demo;
