import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {loginUser, logoutUser, setCurrentUser} from "./actions/authActions";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import {clearCurrentProfile} from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";  
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience"



import "./App.css";
import store from "./store";
import AddEducation from "./components/add-credentials/AddEducation";
// check for token

if(localStorage.jwtToken)
{
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode the token and get user info and exp
  const decode=jwt_decode(localStorage.jwtToken);
  // set the user
  store.dispatch(setCurrentUser(decode));

  // check for expired toekn
  const currentTime=Date.now()/1000;
  if(decode.exp<currentTime)
  {
    // logout user
    store.dispatch(logoutUser());
    // cleart the current profile
    store.dispatch(clearCurrentProfile());
    window.location
    .href="/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

            <Switch>
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>


            <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>

            <Switch>
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>


          </div>
          <Footer />
        </div>
      </Router>
      </Provider> 
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TexttAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
// import SelectListGroup from '../common/SelectListGroup';
// import { createProfile } from '../../actions/profileActions';