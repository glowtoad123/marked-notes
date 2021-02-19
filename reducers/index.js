import { combineReducers } from "redux";
import selectionReducer from "./selection";


const allReducers = combineReducers({
    selection: selectionReducer
})

export default allReducers