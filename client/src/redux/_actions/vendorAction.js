import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS} from "../types";
import axios from 'axios';

export const vendorRegister =user => {
  return async (dispatch) => { 
       const config = {header: {'Content-Type': 'application/json'}}  
      try {
          const res = await axios.post('/api/vendors/register', user, config)
          console.log(res.data);                 
          dispatch({type: REGISTER_SUCCESS, payload: res.data})
      } catch (err) {
          console.log(err);
          dispatch({type: REGISTER_FAIL, payload: err.response.data.message})
      }    
  }
}

export const vendorLogin = (email, password) => {
  return async dispatch => {
      try {
          const config = {header: {'Content-Type': 'application/json'}}  
          const res = await axios.post(`/api/vendors/login`, {email, password}, config);
          dispatch({type: LOGIN_SUCCESS, payload: res.data});
          } catch (err) {
          console.log(err);
          dispatch({type: LOGIN_FAIL, payload: err.response.data.message});
          }     
      }
  }
