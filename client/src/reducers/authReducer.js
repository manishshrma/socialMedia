// import allReducers from "../../../../Redux/learn_redux/src/reducers";
import {TEST_DISPATCH} from "../actions/types";
const initialState = {
  isAuthenticated: false, 
  user: {},
};


const authReducer = (state = initialState, action) => {  // there it is(state)
  switch (action.type) {
   default:
    return state;
  }
};
export default authReducer;
