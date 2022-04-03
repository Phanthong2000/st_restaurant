import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import areaReducer from './reducers/areaReducer';
import authReducer from './reducers/authReducer';
import foodReducer from './reducers/foodReducer';
import orderReducer from './reducers/orderReducer';
import userReducer from './reducers/userReducer';
import socketReducer from './reducers/socketReducer';

const rootReducer = combineReducers({
  user: userReducer,
  food: foodReducer,
  order: orderReducer,
  auth: authReducer,
  area: areaReducer,
  socket: socketReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
