import { Dispatch } from 'redux';
import { SetSearchAction } from '../reducers/search';
import { search as SearchActions } from '../actionTypes.json';
import SauceNaoApi from '../../data/SauceNaoApi';

export const searchByUrl = (url : string) => async (dispatch : Dispatch<SetSearchAction>) => {
    const response = await SauceNaoApi.SearchByUrl(url);
    if(response?.results) {
        dispatch({
            type: SearchActions.SET_RESULTS,
            results: response.results
        });
    }
}