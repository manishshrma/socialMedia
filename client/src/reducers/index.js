import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
const allReducers=combineReducers({
    auth:authReducer,  // auth have authreducer in it. it also have state. 
    errors:errorReducer,
    post:postReducer,
    profile:profileReducer,
})

export default allReducers;