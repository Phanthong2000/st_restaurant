import {
  ACTION_AREA_GET_ALL_AREAS,
  ACTION_AREA_GET_ALL_TABLES,
  ACTION_ORDER_GET_AREAS_FOR_ORDER
} from '../actions/types';

const defaultState = {
  allAreas: [],
  allTables: [],
  areaForOrder: {
    using: [],
    dontUse: []
  }
};

// eslint-disable-next-line default-param-last
const areaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_AREA_GET_ALL_AREAS:
      return {
        ...state,
        allAreas: action.payload
      };
    case ACTION_AREA_GET_ALL_TABLES:
      return {
        ...state,
        allTables: action.payload
      };
    case ACTION_ORDER_GET_AREAS_FOR_ORDER:
      return {
        ...state,
        areaForOrder: action.payload
      };
    default:
      return state;
  }
};

export default areaReducer;
