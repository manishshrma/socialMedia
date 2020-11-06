import axios from 'axios';
import {TEST_DISPATCH} from "./types";
import {GET_ERRORS} from "./types";

export const registeruser=userdata=>dispatch=>{


    axios.post("/api/users/register",userdata)
    .then(res=>console.log(res.data))
    .catch(err=>{
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    })
   
}
