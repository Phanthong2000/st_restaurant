import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import foodReducer from './reducers/foodReducer';
import orderReducer from './reducers/orderReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  food: foodReducer,
  order: orderReducer,
  auth: authReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
