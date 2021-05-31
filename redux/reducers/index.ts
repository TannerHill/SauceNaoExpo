import { combineReducers, Reducer } from "redux";
import SearchReducer, { SearchState } from "./search";
import ErrorReducer, { ErrorState } from "./error";

export interface AppState {
    search : SearchState,
    error : ErrorState
}

const rootReducer : Reducer<AppState> = combineReducers({
    search: SearchReducer,
    error: ErrorReducer
});

export default rootReducer;