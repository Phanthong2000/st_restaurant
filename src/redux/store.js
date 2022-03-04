import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import foodReducer from './reducers/foodReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  food: foodReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
