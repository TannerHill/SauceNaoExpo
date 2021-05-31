import { Dispatch } from 'redux';
import { SetSearchAction } from '../reducers/search';
import { search as SearchActions } from '../actionTypes.json';
import SauceNaoApi from '../../data/SauceNaoApi';

export const search = (uri : string, isFile : boolean = false) => async (dispatch : Dispatch<SetSearchAction>) => {
    const response = isFile
        ? await SauceNaoApi.SearchByFile(uri)
        : await SauceNaoApi.SearchByUrl(uri);

    if(response?.results) {
        if(response.results.length > 0) {
            dispatch({
                type: SearchActions.SET_RESULTS,
                results: response.results
            });
            return true;
        }
    }
    return false;
} 