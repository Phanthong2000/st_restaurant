import { ACTION_FOOD_GET_TYPE_CHOSEN } from '../actions/types';

const defaultState = {
  typeChosen: {
    id: '',
    name: 'all'
  }
};

// eslint-disable-next-line default-param-last
const foodReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_FOOD_GET_TYPE_CHOSEN:
      return {
        ...state,
        typeChosen: action.payload
      };
    default:
      return state;
  }
};
export default foodReducer;
