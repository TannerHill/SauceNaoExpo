import { Dispatch } from 'redux';
import { SetErrorAction } from '../reducers/error';
import { error as ErrorActions } from '../actionTypes.json';

export const setError = (message : string) => (dispatch : Dispatch<SetErrorAction>) => {
    dispatch({
        type: ErrorActions.SET_ERROR,
        message
    });
}