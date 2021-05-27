import { Action } from 'redux';
import { error as ErrorActions } from '../actionTypes.json';

interface ErrorState {
    message?: string
}

export interface SetErrorAction extends Action {
    message: string
}

const initialState : ErrorState = {};

const ErrorReducer = (state : ErrorState = initialState, action : Action) : ErrorState => {
    switch(action.type) {
        case ErrorActions.SET_ERROR: {
            return {
                ...state,
                message: (action as SetErrorAction).message
            }
        }
        default: return state;
    }
}  

export default ErrorReducer;