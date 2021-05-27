import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers';

const middleware = [thunk];

export default createStore(RootReducer, {}, applyMiddleware(...middleware));