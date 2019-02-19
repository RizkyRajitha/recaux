import React, { Component } from "react";
import "./App.css";
// const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");
import Login from "./components/login";
import Home from "./components/home";
import About from "./components/register";
import User from "./components/dashboard";
import Navbar from './components/navbar'
import fogotpassword from './components/fogotpassword'
import resetpassword from './components/resetpassword'

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Navbar  />
          <Route exac path="/home" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/register" component={About} />
          <Route path="/Login" component={Login} />
          <Route path="/fogotpassword" component={fogotpassword} />
          <Route path="/resetpassword/:id" component={resetpassword} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
