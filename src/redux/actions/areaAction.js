import axios from 'axios';
import api from '../../assets/api/api';
import { ACTION_AREA_GET_ALL_AREAS } from './types';

export const actionAreaGetAllAreas = (data) => ({
  type: ACTION_AREA_GET_ALL_AREAS,
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
