import React from 'react';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import LandingPage from './components/pages/LandingPage'
import Navbar from './components/partials/Navbar'
import Alerts from './components/partials/Alerts'
import VendorRegister from './components/vendors/VendorRegister'
import VendorLogin from './components/vendors/VendorLogin'
import VendorHome from './components/vendors/VendorHome'


if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
   <Router>
     <Navbar />
     <div className="container">
     <Alerts />
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/vendors/register' component={VendorRegister}/>
        <Route exact path='/vendors/login' component={VendorLogin}/>
        <Route exact path='/vendors/home' component={VendorHome}/>
        <Route exact path='/users/register' component={Register}/>
        <Route exact path='/users/login' component={Login}/>
      </Switch>
     </div>     
   </Router>
   </>
  );
}

export default App;
