import {
  ACTION_FOOD_GET_TYPE_CHOSEN,
  ACTION_FOOD_GET_ALL_FOODS,
  ACTION_FOOD_GET_ALL_TYPE_FOODS,
  ACTION_FOOD_GET_ALL_FOODS_BY_NAME
} from '../actions/types';

const defaultState = {
  typeChosen: {
    id: '',
    name: 'all'
  },
  foods: [],
  typefoods: [],
  foodsByName: []
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
    case ACTION_FOOD_GET_ALL_FOODS_BY_NAME:
      return {
        ...state,
        foodsByName: action.payload
      };
    default:
      return state;
  }
};
export default foodReducer;
