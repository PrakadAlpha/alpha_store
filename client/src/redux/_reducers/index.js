import { combineReducers } from 'redux'
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import vendorReducer from './vendorReducer';


export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  vendor: vendorReducer
});