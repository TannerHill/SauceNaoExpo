import { Dispatch } from 'redux';
import { SetSearchAction } from '../reducers/search';
import { search as SearchActions, error as ErrorActions } from '../actionTypes.json';
import SauceNaoApi from '../../data/SauceNaoApi';
import { SetErrorAction } from '../reducers/error';

export const search = (uri : string, isFile : boolean, callback : (success : boolean) => void) => async (dispatch : Dispatch<SetSearchAction|SetErrorAction>) => {
    const response = isFile
        ? await SauceNaoApi.SearchByFile(uri)
        : await SauceNaoApi.SearchByUrl(uri);

    if(typeof response !== 'string') {
        if(response?.results && response.results.length > 0) {
            dispatch({
                type: SearchActions.SET_RESULTS,
                results: response.results
            });
            callback(true);
        }
    }
    else {
        dispatch({
            type: ErrorActions.SET_ERROR,
            message: response
        })
    }
    callback(false);
} 