import { Action } from 'redux';
import { error as ErrorActions } from '../actionTypes.json';

export interface ErrorState {
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
                message: (action as SetErrorAction).message
            }
        }
        case ErrorActions.DISMISS_ERROR: {
            return {}
        }
        default: return state;
    }
}  

export default ErrorReducer;