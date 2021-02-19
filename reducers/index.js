import { combineReducers } from "redux";
import newPageReducer from "./newpage";
import selectionReducer from "./selection";


const allReducers = combineReducers({
    selection: selectionReducer,
    newPage: newPageReducer
})

export default allReducers