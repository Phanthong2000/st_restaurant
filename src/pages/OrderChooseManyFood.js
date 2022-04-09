import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Input,
  InputBase,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import BoxBreadcrumbs from '../components/BoxBreadcrumbs';
import TypeFoodItem from '../components/food/TypeFoodItem';
import { actionFoodGetTypeChosen } from '../redux/actions/foodAction';
import { actionOrderSetFoodsMany } from '../redux/actions/orderAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
const BoxInformationCustomer = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3, 10)
}));
const InputWapper = styled(Grid)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: '20px'
}));
const TitleInformation = styled(Typography)(({ theme }) => ({
  color: theme.palette.black
}));
const InputInfo = styled(Input)(({ theme }) => ({
  fontSize: '16px',
  width: '100%',
  color: theme.palette.white
}));
const BoxTable = styled(Box)(({ theme }) => ({
  width: '80%',
  marginLeft: '10%',
  background: theme.palette.white,
  padding: '10px',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    width: '98%',
    marginLeft: '1%'
  }
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '60%',
  background: theme.palette.white,
  margin: '10px 20%',
  padding: theme.spacing(0.5, 0.5, 0.5, 2),
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    marginLeft: '10%'
  }
}));
const InputSearch = styled(InputBase)(({ theme }) => ({
  fontSize: '16px'
}));
const BoxIconSearch = styled(Box)(({ theme }) => ({
  background: theme.palette.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5, 2),
  borderRadius: '10px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxSort = styled(Card)(({ theme }) => ({
  width: '60%',
  margin: '20px 20%',
  background: theme.palette.gray,
  display: 'flex',
  padding: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    marginLeft: '5%',
    display: 'block'
  }
}));
const ButtonSortPrice = styled(Button)(({ theme }) => ({
  width: '100px',
  fontSize: '12px',
  marginLeft: '10px',
  background: theme.palette.white,
  color: theme.palette.black,
  textTransform: 'none',
  ':hover': {
    background: theme.palette.mainHover
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
const BoxAllFood = styled(Box)(({ theme }) => ({
  width: '90%',
  margin: '20px 5%'
}));
function FoodItemOrder({ food, tab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foodsMany = useSelector((state) => state.order.foodsMany);
  const [isChosen, setIsChosen] = useState(false);
  const checkFoodChosenOrder = () => {
    let flag = false;
    foodsMany.at(tab - 1).foods.forEach((item) => {
      if (item.food.id === food.id) {
        flag = true;
      }
    });
    setIsChosen(flag);
  };
  useEffect(() => {
    checkFoodChosenOrder();
    return function () {
      return null;
    };
  }, [foodsMany]);
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
  const ButtonChooseFood = styled(Button)(({ theme }) => ({
    width: '45%',
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
  const ButtonSeeInformation = styled(Button)(({ theme }) => ({
    width: '45%',
    textTransform: 'none',
    color: theme.palette.main,
    background: theme.palette.white,
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily.second,
    marginTop: '20px',
    fontWeight: 'bold',
    ':hover': {
      background: theme.palette.gray,
      color: theme.palette.white
    }
  }));
  const checkDescriptionLength = () => {
    if (food.moTa.length < 200) return `${food.moTa}`;
    return `${food.moTa.substring(0, 200)}...`;
  };
  const chooseFood = () => {
    let data = foodsMany.at(tab - 1);
    data = {
      order: tab,
      foods: [...data.foods, { food, soLuong: 1 }]
    };
    dispatch(
      actionOrderSetFoodsMany(
        foodsMany
          .slice(0, tab - 1)
          .concat([data])
          .concat(foodsMany.slice(tab, foodsMany.length))
      )
    );
  };
  if (isChosen) return null;
  return (
    <RootStyle item xs={12} sm={6} md={6} lg={4} xl={4}>
      <BoxFood sx={{ '&:hover': { boxShadow: 20 } }}>
        <AvatarFood src={food.hinhAnh.at(0)} />
        <BoxNamePrice>
          <NameFood>{food.tenMonAn}</NameFood>
          <PriceFood>
            <b style={{ fontSize: '20px', color: '#000' }}>Giá: </b>
            {`${food.donGia.toLocaleString('es-US')} vnđ`}
          </PriceFood>
        </BoxNamePrice>
        <Typography maxHeight="120px">{checkDescriptionLength()}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <ButtonSeeInformation>Xem thông tin</ButtonSeeInformation>
          <ButtonChooseFood onClick={chooseFood}>Chọn món</ButtonChooseFood>
        </Box>
      </BoxFood>
    </RootStyle>
  );
}
function BoxTypeFoodOrder({ type, tab }) {
  const [allFoods, setAllFoods] = useState([]);
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const foods = useSelector((state) => state.food.foodsByName);
  const getAllFoodsByType = () => {
    const data = [];
    foods.forEach((food) => {
      if (food.loaiMonAn.id === type.id && food.trangThai === 'Đang bán') data.push(food);
    });
    setAllFoods(data);
  };
  useEffect(() => {
    getAllFoodsByType();
    return function () {
      return null;
    };
  }, [typeChosen, foods]);
  const RootStyle = styled(Box)(({ theme }) => ({
    width: '100%',
    background: theme.palette.white,
    padding: '10px'
  }));
  const Separate = styled(Divider)(({ theme }) => ({
    width: '50%',
    marginLeft: '25%',
    color: theme.palette.background,
    marginTop: '20px',
    fontSize: '20px',
    fontWeight: 'bold'
  }));
  const GridFood = styled(Grid)(() => ({
    width: '100%'
  }));
  return (
    <RootStyle>
      <Separate>{typeChosen.name === 'all' ? type.tenLoaiMonAn : type.name}</Separate>
      <GridFood container>
        {allFoods.map((item, index) => (
          <FoodItemOrder tab={tab} order key={index} food={item} />
        ))}
      </GridFood>
    </RootStyle>
  );
}
function TableTab({ table, value }) {
  const foodsMany = useSelector((state) => state.order.foodsMany);
  const dispatch = useDispatch();
  const BoxTable = styled(Box)(({ theme }) => ({
    width: '100%',
    marginLeft: '20px'
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '18ox',
    color: theme.palette.gray,
    fontFamily: theme.typography.fontFamily.primary
  }));
  const CellHeader = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px'
    }
  }));
  const CellBody = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary,
    height: '100px'
  }));
  const IconQuantity = styled(Icon)(({ theme }) => ({
    width: '25px',
    height: '25px',
    color: 'red',
    cursor: 'pointer'
  }));
  const headers = [
    {
      name: 'STT',
      width: '10%'
    },
    {
      name: 'Tên món ăn',
      width: '30%'
    },
    {
      name: 'Đơn giá',
      width: '20%'
    },
    {
      name: 'Số lượng',
      width: '10%'
    },
    {
      name: 'Thành tiền',
      width: '10%'
    },
    {
      name: 'Bỏ chọn',
      width: '10%'
    }
  ];
  const deleteFoodChosen = (food) => {
    let data = foodsMany.at(value - 1);
    data = {
      ...data,
      foods: data.foods.filter((item) => item.food.id !== food.id)
    };
    dispatch(
      actionOrderSetFoodsMany(
        foodsMany
          .slice(0, value - 1)
          .concat([data])
          .concat(foodsMany.slice(value, foodsMany.length))
      )
    );
  };
  if (table.order !== value) return null;
  return (
    <BoxTable>
      <Title>
        Số người mỗi bàn: {table.soNguoiMoiBan} - Số bàn: {table.soLuongBan}
      </Title>
      <Box sx={{ width: '100%', border: `1px solid lightgrey`, borderRadius: '5px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((item, index) => (
                  <CellHeader key={index} sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </CellHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {foodsMany.at(table.order - 1).foods.map((item, index) => (
                <TableRow key={index}>
                  <CellBody>{index + 1}</CellBody>
                  <CellBody>{item.food.tenMonAn}</CellBody>
                  <CellBody>{item.food.donGia}</CellBody>
                  <CellBody>
                    <Box sx={{ display: 'flex' }}>
                      <IconQuantity icon="akar-icons:circle-minus-fill" />
                      <Typography sx={{ width: '30px', textAlign: 'center' }}>
                        {item.soLuong}
                      </Typography>
                      <IconQuantity
                        style={{ color: 'lightgreen' }}
                        icon="akar-icons:circle-plus-fill"
                      />
                    </Box>
                  </CellBody>
                  <CellBody>{(item.soLuong * item.food.donGia).toLocaleString(`es-US`)}</CellBody>
                  <CellBody>
                    <Icon
                      onClick={() => deleteFoodChosen(item.food)}
                      style={{ color: 'red', width: '30px', height: '30px', cursor: 'pointer' }}
                      icon="ci:off-close"
                    />
                  </CellBody>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </BoxTable>
  );
}
function OrderChooseManyFood() {
  const bookMany = useSelector((state) => state.order.bookMany);
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const typefoods = useSelector((state) => state.food.typefoods);
  const foodsMany = useSelector((state) => state.order.foodsMany);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const chooseTypeAll = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: '',
        name: 'all'
      })
    );
  };
  return (
    <RootStyle>
      <BoxBreadcrumbs name="Đặt bàn" />
      <BoxInformationCustomer container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Thông tin khách hàng đặt bàn
          </Typography>
        </Grid>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <TitleInformation sx={{ fontSize: '16px' }}>Họ tên:</TitleInformation>
          <InputInfo disabled value={bookMany.customerName} fullWidth placeholder="Aa" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <TitleInformation sx={{ fontSize: '16px' }}>Email:</TitleInformation>
          <InputInfo disabled value={bookMany.email} fullWidth placeholder="Aa" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <TitleInformation sx={{ fontSize: '16px' }}>Số điện thoại:</TitleInformation>
          <InputInfo disabled value={bookMany.phone} fullWidth placeholder="0123456789" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <Typography sx={{ fontSize: '16px' }}>Thời gian nhận bàn</Typography>
          <DatePicker
            disabled
            customInput={<InputInfo fullWidth />}
            selected={bookMany.date}
            showTimeSelect
            dateFormat="dd/MM/yyyy, hh:mm a"
            // onChange={(newValue) => {
            //   console.log(newValue.getTime());
            //   setDateUse(newValue);
            // }}
          />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <Typography sx={{ fontSize: '16px' }}>Thời gian đặt bàn</Typography>
          <DatePicker
            disabled
            customInput={<InputInfo fullWidth />}
            selected={new Date().getTime()}
            showTimeSelect
            dateFormat="dd/MM/yyyy, hh:mm a"
            // onChange={(newValue) => {
            //   console.log(newValue.getTime());
            //   setDateUse(newValue);
            // }}
          />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <Typography sx={{ fontSize: '16px' }}>Số khách:</Typography>
          <InputInfo disabled value={bookMany.quantityCustomer} fullWidth placeholder="0" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng:</Typography>
          <InputInfo disabled value={bookMany.timeUse.name} fullWidth placeholder="0" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <Typography sx={{ fontSize: '16px' }}>Khu vực:</Typography>
          <InputInfo disabled value={bookMany.area.tenKhuVuc} fullWidth placeholder="0" />
        </InputWapper>
        <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
          <Typography sx={{ fontSize: '16px' }}>Ghi chú:</Typography>
          <InputInfo disabled value={bookMany.description} fullWidth placeholder="Aa" />
        </InputWapper>
      </BoxInformationCustomer>
      <Box sx={{ background: '#3d4045', width: '100%', padding: '20px 0px' }}>
        <BoxTable>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: '100px' }}
          >
            {bookMany.listLoaiBan.map((item, index) => (
              <Tab value={item.order} key={index} label={`Loại ${item.order}`} />
            ))}
          </Tabs>
          {bookMany.listLoaiBan.map((item, index) => (
            <TableTab key={index} table={item} value={tab} />
          ))}
        </BoxTable>
        <BoxSearch>
          <InputSearch fullWidth placeholder="Tìm kiếm món ăn" />
          <BoxIconSearch>
            <Icon
              style={{ color: '#fff', width: '30px', height: '30px' }}
              icon="ant-design:search-outlined"
            />
          </BoxIconSearch>
        </BoxSearch>
        <BoxSort elevation={3}>
          <Typography sx={{ color: '#fff', fontSize: '16px' }}>Sắp xếp theo</Typography>
          <ButtonSortPrice
            onClick={chooseTypeAll}
            sx={typeChosen.name === 'all' && { background: '#3C58C9', color: '#fff' }}
          >
            Tất cả
          </ButtonSortPrice>
          {typefoods.map((item, index) => (
            <TypeFoodItem key={index} type={item} />
          ))}
        </BoxSort>
        <BoxAllFood>
          {typeChosen.name === 'all' ? (
            <>
              {typefoods.map((item, index) => (
                <BoxTypeFoodOrder tab={tab} key={index} type={item} />
              ))}
            </>
          ) : (
            <BoxTypeFoodOrder tab={tab} type={typeChosen} />
          )}
        </BoxAllFood>
      </Box>
    </RootStyle>
  );
}

export default OrderChooseManyFood;
