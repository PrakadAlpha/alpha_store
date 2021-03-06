import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import setAuthToken from '../../utils/setAuthToken';
import { USER_LOADED, AUTH_ERROR } from '../../redux/types';
import axios from 'axios';
import PropTypes from 'prop-types'

const LandingPage = () => {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const [username, setUsername] = useState('');

  useEffect(() => {

    if(!auth.isAuthenticated){
      setUsername('');
    }

    if(localStorage.token)
      loadUsers();
    // eslint-disable-next-line
  }, [auth.isAuthenticated]);
  
  const loadUsers = async () =>{ 
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get('/api/users/me');
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
      Hi {username ? username : "GuestUser"}
    </div>
    </>
  )
}

export default LandingPage
