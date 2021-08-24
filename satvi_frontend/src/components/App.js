import '../App.css';
import '../index.css';

import Signin_screen from './signin_screen';
import Signup_screen from './signup_screen';
import Signout_screen from './signout_screen';
import Home_screen from './home_screen';
import Video_screen from './video_screen';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div>
      <Router >
        <Switch>
          <Route exact path="/" component={Home_screen}/>
          <Route exact path="/signin" component={Signin_screen}/>
          <Route exact path="/signout" component={Signout_screen}/>
          <Route exact path="/signup" component={Signup_screen}/>
          <Route exact path="/video" component={Video_screen}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
