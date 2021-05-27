import { combineReducers } from "redux";
import SearchReducer from "./search";
import ErrorReducer from "./error";

const rootReducer = combineReducers({
    search: SearchReducer,
    error: ErrorReducer
});

export default rootReducer;