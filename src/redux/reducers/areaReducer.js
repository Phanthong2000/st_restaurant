import { ACTION_AREA_GET_ALL_AREAS } from '../actions/types';

const defaultState = {
  allAreas: []
};

// eslint-disable-next-line default-param-last
const areaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_AREA_GET_ALL_AREAS:
      return {
        ...state,
        allAreas: action.payload
      };
    default:
      return state;
  }
};

export default areaReducer;
