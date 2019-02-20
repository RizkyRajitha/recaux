import React, { Component } from "react";
import "./App.css";
// const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");
import Login from "./components/login";
import Home from "./components/home";
import About from "./components/register";
import Dashboard from "./components/dashboard";
import Navbar from './components/navbar'
import fogotpassword from './components/fogotpassword'
import resetpassword from './components/resetpassword'
import emailconfirm from './components/emailverify'

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Navbar  />
          <Route exac path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={About} />
          <Route path="/Login" component={Login} />
          <Route path="/fogotpassword" component={fogotpassword} />
          <Route path="/resetpassword/:id" component={resetpassword} />
          <Route path="/confirmemail/:id" component={emailconfirm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
