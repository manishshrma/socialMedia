import authReducer from "./authReducer";

const { ADD_POST, GET_POST, POST_LOADING,DELETE_POST } = require("../actions/types");
const initialState = {
  posts: [],
  post: {},
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

      case DELETE_POST:
          return{
              ...state,
              posts :state.posts.filter(post=>post._id!==action.payload)
          }

    case GET_POST:
      return {
        ...state,
        posts:action.payload,
        loading:false
      };

    default:
      return state;
  }
};

export default postReducer;
