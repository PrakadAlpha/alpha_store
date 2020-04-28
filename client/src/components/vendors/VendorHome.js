import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { USER_LOADED, AUTH_ERROR } from '../../redux/types';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import VendorMenu from './VendorMenu';
import UploadProduct from './UploadProduct';
import OrdersList from './OrdersList';
import ProductsList from './ProductsList';
import VendorWelcome from './VendorWelcome';


const VendorHome = ({history}) => {
  
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  const [username, setUsername] = useState('');

  useEffect(() => {
    if(!auth.isAuthenticated){
      history.push('/');
    }
    if(localStorage.token)
      loadUsers();
    // eslint-disable-next-line
  }, [ auth.isAuthenticated]);

  const loadUsers = async () =>{ 
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get('/api/vendors/me');
        setUsername(res.data.data.name);
        dispatch({type: USER_LOADED, payload: res.data});
      } catch (err) {
        console.log(err);
        dispatch({type: AUTH_ERROR, payload: err.message}); 
      }
  }
  return (
    <Router> 
     <VendorMenu />
     <div className="container">  
      <Switch> 
        <Route exact path='/vendors/home' component={VendorWelcome}/>
        <Route exact path='/vendors/productsList' component={ProductsList}/>
        <Route exact path='/vendors/uploadProduct' component={UploadProduct}/>
        <Route exact path='/vendors/ordersList' component={OrdersList}/>
      </Switch>
     </div>     
    </Router>
  )
 
}

export default VendorHome
