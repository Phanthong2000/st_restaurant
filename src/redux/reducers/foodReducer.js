import {
  ACTION_FOOD_GET_TYPE_CHOSEN,
  ACTION_FOOD_GET_ALL_FOODS,
  ACTION_FOOD_GET_ALL_TYPE_FOODS
} from '../actions/types';

const defaultState = {
  typeChosen: {
    id: '',
    name: 'all'
  },
  foods: [],
  typefoods: []
};

// eslint-disable-next-line default-param-last
const foodReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_FOOD_GET_TYPE_CHOSEN:
      return {
        ...state,
        typeChosen: action.payload
      };
    case ACTION_FOOD_GET_ALL_FOODS:
      return {
        ...state,
        foods: action.payload
      };
    case ACTION_FOOD_GET_ALL_TYPE_FOODS:
      return {
        ...state,
        typefoods: action.payload
      };
    default:
      return state;
  }
};
export default foodReducer;
