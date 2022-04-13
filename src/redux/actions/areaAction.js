import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_AREA_GET_ALL_AREAS,
  ACTION_AREA_GET_ALL_TABLES,
  ACTION_ORDER_GET_AREAS_FOR_ORDER
} from './types';

export const actionAreaGetAllAreas = (data) => ({
  type: ACTION_AREA_GET_ALL_AREAS,
  payload: data
});
export const actionAreaGetAllTables = (data) => ({
  type: ACTION_AREA_GET_ALL_TABLES,
  payload: data
});
export const actionOrderGetAreasForOrder = (data) => ({
  type: ACTION_ORDER_GET_AREAS_FOR_ORDER,
  payload: data
});
export const actionGetAllAreas = () => (dispatch) => {
  axios.get(`${api}khuVuc/list`).then((res) => {
    dispatch(
      actionAreaGetAllAreas(
        res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
      )
    );
  });
};
export const actionGetAllTables = () => async (dispatch) => {
  const data = await axios.get(`${api}ban/list`);
  dispatch(actionAreaGetAllTables(data.data));
};

export const actionGetAreasForOrder = (checkin, use) => async (dispatch) => {
  const data = await axios.get(`${api}donDatBan/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  const newBook = [];
  data.data.forEach((book) => {
    const a = Date.parse(book.thoiGianNhanBan);
    const b = book.thoiGianDuKienSuDung;
    if (book.trangThai !== '1') {
      if (
        (checkin >= a && checkin + use <= a + b) ||
        (checkin <= a + b && checkin + use >= a + b) ||
        (checkin <= a && checkin + use >= a)
      )
        newBook.push(book);
    }
  });
  const tableUsing = [];
  const tableDontUse = [];
  newBook.forEach((book) => {
    console.log(book);
    if (book.trangThai === '0') {
      tableDontUse.push(...book.listBan);
    } else if (book.trangThai === '2') {
      tableUsing.push(...book.listBan);
    }
  });
  console.log('using', tableUsing);
  console.log('dont use', tableDontUse);
  dispatch(
    actionOrderGetAreasForOrder({
      using: tableUsing,
      dontUse: tableDontUse
    })
  );
};
