import { Action } from 'redux';
import { search as SearchActions } from '../actionTypes.json';

interface SearchState {
    results: SearchResult[]
}

export interface SetSearchAction extends Action {
    results: SearchResult[]
}

const initialState: SearchState = {
    results: []
}

const SearchReducer = (state: SearchState = initialState, action : Action) : SearchState => {
    switch(action.type) {
        case SearchActions.SET_RESULTS: {
            return {
                ...state,
                results: (action as SetSearchAction).results
            }
        }
        default: return state;
    }
}

export default SearchReducer;