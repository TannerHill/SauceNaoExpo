import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer, { AppState } from './reducers';

const middleware = [thunk];

const initialState : AppState = {
    search: {
        results: []
    },
    error: {}
}

export default createStore(RootReducer, initialState, applyMiddleware(...middleware));