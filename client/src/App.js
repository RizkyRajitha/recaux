import React, { Component } from "react";
import "./App.css";
// const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import fogotpassword from "./components/fogotpassword";
import resetpassword from "./components/resetpassword";
import emailconfirm from "./components/emailverify";
import Addcandidate from './components/addCandidate';
import adminlogin from './components/adminlogin';

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/addcandidate" component={Addcandidate} />
          <Route path="/Login" component={Login} />
          <Route path="/fogotpassword" component={fogotpassword} />
          <Route path="/resetpassword/:id" component={resetpassword} />
          <Route path="/confirmemail/:id" component={emailconfirm} />
          <Route path="/admin" component={adminlogin} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
