import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validations/is-empty";
const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  // there it is(state)
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user:action.payload
      };

    default:
      return state;
  }
};
export default authReducer;
