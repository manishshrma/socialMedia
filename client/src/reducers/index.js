import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const allReducers=combineReducers({
    auth:authReducer,  // auth have authreducer in it. it also have state. 
    errors:errorReducer
})

export default allReducers;