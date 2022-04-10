import {
  ACTION_ORDER_GET_ORDER,
  ACTION_ORDER_ADD_FOODS,
  ACTION_ORDER_DELETE_FOODS,
  ACTION_ORDER_EDIT_FOODS,
  ACTION_ORDER_MODAL_INFORMATION_FOOD,
  ACTION_ORDER_SET_FOODS,
  ACTION_ORDER_GET_ALL_BOOKS,
  ACTION_ORDER_SUCCESS,
  ACTION_ORDER_MODAL_WAYPAY,
  ACTION_ORDER_GET_ORDER_MANY,
  ACTION_ORDER_SET_FOODS_MANY
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
  allBooks: [],
  orderSuccess: false,
  modalWayPay: {
    status: false,
    wayPay: {}
  },
  bookMany: {
    customerName: '',
    email: '',
    phone: '',
    date: 0,
    quantityCustomer: 0,
    timeUse: 0,
    area: {},
    description: '',
    listLoaiBan: []
  },
  foodsMany: []
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
    case ACTION_ORDER_SUCCESS:
      return {
        ...state,
        orderSuccess: action.payload
      };
    case ACTION_ORDER_MODAL_WAYPAY:
      return {
        ...state,
        modalWayPay: action.payload
      };
    case ACTION_ORDER_GET_ORDER_MANY:
      return {
        ...state,
        bookMany: action.payload
      };
    case ACTION_ORDER_SET_FOODS_MANY:
      return {
        ...state,
        foodsMany: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer;
