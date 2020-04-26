import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {vendorRegister} from '../../redux/_actions/vendorAction';
import {Link} from 'react-router-dom'
import {setAlert} from '../../redux/_actions/alertAction'
import {CLEAR_ERRORS} from '../../redux/types';


const VendorRegister = ({history}) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('token') && auth.isAuthenticated)
      history.push('/vendors/login');

    if(auth.error === 'Vendor already exists'){
      dispatch(setAlert(auth.error, 'danger'));
      dispatch({type: CLEAR_ERRORS});
    }
    // eslint-disable-next-line
  }, [auth.isAuthenticated, auth.error]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const {name, email, password} = newUser; 

  const onChange = (e) => setNewUser({...newUser, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if(name === '' || email === '' || password === '')
      dispatch(setAlert('Please enter all the fields.', 'danger'));
    else
      dispatch(vendorRegister(newUser));
  }

  return (
    <div className="form-container">
      <h1>
        Vendor <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} minLength='6'/>
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block"/>
      </form>
      <p>Already have an account <Link to="/vendors/login">Login</Link></p>
    </div>
  )
}

export default VendorRegister;
