import {
  ACTION_ORDER_GET_ORDER,
  ACTION_ORDER_ADD_FOODS,
  ACTION_ORDER_DELETE_FOODS,
  ACTION_ORDER_EDIT_FOODS,
  ACTION_ORDER_MODAL_INFORMATION_FOOD,
  ACTION_ORDER_SET_FOODS,
  ACTION_ORDER_GET_ALL_BOOKS
} from '../actions/types';

const defaultState = {
  book: {
    customerName: '',
    email: '',
    phone: '',
    date: 0,
    quantityCustomer: 0,
    timeUse: 0,
    area: {},
    description: ''
  },
  foods: [],
  modalInformationFood: {
    status: false,
    food: {}
  },
  allBooks: []
};

// eslint-disable-next-line default-param-last
const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_ORDER_GET_ORDER:
      return {
        ...state,
        book: action.payload
      };
    case ACTION_ORDER_ADD_FOODS:
      return {
        ...state,
        foods: [...state.foods, action.payload]
      };
    case ACTION_ORDER_DELETE_FOODS:
      return {
        ...state,
        foods: [
          ...state.foods
            .slice(0, action.payload)
            .concat(...state.foods.slice(action.payload + 1, state.foods.length))
        ]
      };
    case ACTION_ORDER_EDIT_FOODS:
      return {
        ...state,
        foods: [
          ...state.foods
            .slice(0, action.payload.index)
            .concat(action.payload.food)
            .concat(...state.foods.slice(action.payload.index + 1, state.foods.length))
        ]
      };
    case ACTION_ORDER_SET_FOODS:
      return {
        ...state,
        foods: action.payload
      };
    case ACTION_ORDER_MODAL_INFORMATION_FOOD:
      return {
        ...state,
        modalInformationFood: action.payload
      };
    case ACTION_ORDER_GET_ALL_BOOKS:
      return {
        ...state,
        allBooks: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer;
