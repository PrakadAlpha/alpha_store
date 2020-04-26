import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { USER_LOADED, AUTH_ERROR } from '../../redux/types';

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
    <>
    <div style={{textAlign: "center"}}>
      Hi {username} Vendor Home Page
    </div>
    </>
  )
 
}

export default VendorHome
