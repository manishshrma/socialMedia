import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { TEST_DISPATCH } from "./types";
import { GET_ERRORS,SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
/////// register action
export const registerUser = (userData, history) => dispatch => {
    axios
      .post('/api/users/register', userData)
      .then(res=>history.push("/login"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  ////////login action

  export const loginUser=(userData)=>dispatch=>{

  axios.post("/api/users/login",userData)
   .then(res=>{
       // set token to localstorage
       const {token}=res.data
       localStorage.setItem('jwtToken',token)

       // set token to auth header
       setAuthToken(token);
       // decode token to get the user
       const decode=jwt_decode(token);
       //set the current user
       dispatch(setCurrentUser(decode));
   })
   .catch((err)=>dispatch({
       type:GET_ERRORS,
       payload:err.response.data
   })
   );
  };
  ////set logged in user(action)

  export const setCurrentUser=(decode)=>{
      return{
          type:SET_CURRENT_USER,
          payload:decode
      }
  }
  /////logout action
  export const logoutUser=()=>dispatch=>{
      localStorage.removeItem('jwtToken')
      //remove auth header for future requests
      setAuthToken(false);
      //set current user to empty object which will aslo set isAuthent to false  

      dispatch(setCurrentUser({}))
  }