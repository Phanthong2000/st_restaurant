import React, { useEffect, useState, useRef } from 'react';
import {
  Avatar,
  Box,
  Card,
  styled,
  TextField,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import { Icon } from '@iconify/react';
import api from '../../assets/api/api';
import {
  actionGetUser,
  actionUserBackdrop,
  actionUserShowHotToast,
  actionUserSnackbar
} from '../../redux/actions/userAction';
import { storage } from '../../firebase-config';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
const BoxDetail = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: theme.spacing(2),
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '25%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '80%',
  marginLeft: '10%',
  marginBottom: '15px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: '0px'
  }
}));
const Input = styled(TextField)(({ theme }) => ({
  width: '100%'
}));
const AvatarUser = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '200px',
  [theme.breakpoints.down('md')]: {
    width: '40%',
    height: '40%',
    marginLeft: '30%'
  }
}));
const ButtonChangeAvatar = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  marginTop: '20px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const ButtonSaveChangeChange = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  marginTop: '10px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function Detail() {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [identification, setIdentification] = useState('');
  const user = useSelector((state) => state.user.user);
  const [error, setError] = useState('');
  const [image, setImage] = useState({});
  useEffect(() => {
    if (loggedIn && user.taiKhoan !== undefined) {
      setUsername(user.taiKhoan.tenDangNhap);
      setFullName(user.hoTen);
      setAvatar(user.anhDaiDien);
      setPhone(user.soDienThoai);
      setEmail(user.email);
      setAddress(user.diaChi);
      setGender(user.gioiTinh);
      setBirthday(user.ngaySinh);
      setIdentification(user.chungMinhThu);
    }
    return function () {
      return null;
    };
  }, [user]);
  const onChangeFile = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setAvatar(URL.createObjectURL(files[0]));
        setImage(files[0]);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: '???nh ?????i di???n ph???i nh??? h??n 2MB',
            type: 'error'
          })
        );
      }
    }
  };
  const save = () => {
    if (fullName === '') {
      setError('Vui l??ng nh???p h??? t??n');
    } else if (!phone.match('^0[0-9]{8,10}$')) {
      setError('Vui l??ng nh???p s??? ??i???n tho???i');
    } else if (avatar === user.anhDaiDien) {
      dispatch(
        actionUserBackdrop({
          status: true,
          content: 'C???p nh???t th??ng tin'
        })
      );
      axios
        .put(
          `${api}khachHang/edit`,
          {
            ...user,
            hoTen: fullName,
            soDienThoai: phone,
            email,
            diaChi: address,
            chungMinhThu: identification,
            ngaySinh: birthday,
            gioiTinh: 'Nam'
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
              'Content-Type': 'application/json'
            }
          }
        )
        .then((res) => {
          dispatch(
            actionUserBackdrop({
              status: false,
              content: 'C???p nh???t th??ng tin'
            })
          );
          dispatch(
            actionUserSnackbar({
              status: true,
              content: 'C???p nh???t th??ng tin th??nh c??ng',
              type: 'success'
            })
          );
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(
        actionUserBackdrop({
          status: true,
          content: 'C???p nh???t th??ng tin'
        })
      );
      const storageRef = ref(storage, `avatar/${user.id}.${new Date().getTime()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            axios
              .put(
                `${api}khachHang/edit`,
                {
                  ...user,
                  anhDaiDien: downloadURL,
                  hoTen: fullName,
                  soDienThoai: phone,
                  email,
                  diaChi: address,
                  chungMinhThu: identification,
                  ngaySinh: moment(birthday).format(),
                  gioiTinh: gender
                },
                {
                  headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                  }
                }
              )
              .then((res) => {
                dispatch(
                  actionUserBackdrop({
                    status: false,
                    content: 'C???p nh???t th??ng tin'
                  })
                );
                dispatch(
                  actionUserSnackbar({
                    status: true,
                    content: 'C???p nh???t th??ng tin th??nh c??ng',
                    type: 'success'
                  })
                );
                dispatch(actionGetUser(user.id));
              })
              .catch((err) => console.log(err));
          });
        }
      );
    }
  };
  if (user.taiKhoan === undefined) return null;
  return (
    <RootStyle>
      <BoxDetail>
        <BoxTitle>
          <Title>Th??ng tin kh??ch h??ng</Title>
          <Box sx={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
            <>
              <AvatarUser src={avatar} />
              <ButtonChangeAvatar onClick={() => fileRef.current.click()}>
                ?????i ???nh ?????i di???n
              </ButtonChangeAvatar>
            </>
          </Box>
        </BoxTitle>
        <BoxContent>
          <BoxInput>
            <Input disabled fullWidth value={username} label="T??n ????ng nh???p" />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="H??? t??n"
            />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="S??? ??i???n tho???i"
            />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
              label="Ch???ng minh th??"
            />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="?????a ch???"
            />
          </BoxInput>
          <BoxInput>
            <DatePicker
              customInput={<Input label="Ng??y sinh" fullWidth />}
              selected={Date.parse(birthday)}
              dateFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setBirthday(newValue);
              }}
            />
          </BoxInput>
          <BoxInput>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  value="Nam"
                  control={<Radio onClick={() => setGender('Nam')} checked={gender === 'Nam'} />}
                  label="Nam"
                />
                <FormControlLabel
                  value="N???"
                  control={<Radio onClick={() => setGender('N???')} checked={gender === 'N???'} />}
                  label="N???"
                />
              </RadioGroup>
            </FormControl>
          </BoxInput>
          <Typography sx={{ width: '100%', textAlign: 'center', color: 'red' }}>{error}</Typography>
          <BoxInput>
            <ButtonSaveChangeChange onClick={save}>L??u</ButtonSaveChangeChange>
          </BoxInput>
        </BoxContent>
      </BoxDetail>
      <input
        onClick={(e) => {
          e.target.value = null;
        }}
        accept=".png, .jpg, .jpeg"
        onChange={(e) => onChangeFile(e.target.files)}
        ref={fileRef}
        style={{ display: 'none' }}
        type="file"
      />
    </RootStyle>
  );
}

export default Detail;
