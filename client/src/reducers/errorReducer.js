import axios from "axios";
import { TEST_DISPATCH } from "../actions/types";
import { GET_ERRORS } from "../actions/types";

const initialState={};
 const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
