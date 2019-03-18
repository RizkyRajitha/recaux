import React, { Component } from "react";
import "./App.css";
// const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");
import Login from "./pages/login";
import Home from "./components/home";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import fogotpassword from "./pages/fogotpassword";
import resetpassword from "./pages/resetpassword";
import emailconfirm from "./pages/emailverify";
import Addcandidate from "./pages/addCandidate";
import adminlogin from "./pages/adminlogin";
import CandidateView from "./pages/candidateview/CandidateView";
import Evaluation from './pages/evaluation/evaluation'
import TemporaryDrawer from "./sidenav";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <TemporaryDrawer />
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/addcandidate" component={Addcandidate} />
          <Route path="/Login" component={Login} />
          <Route path="/fogotpassword" component={fogotpassword} />
          <Route path="/resetpassword/:id" component={resetpassword} />
          <Route path="/confirmemail/:id" component={emailconfirm} />
          <Route path="/admin" component={adminlogin} />
          <Route path="/getcandidate/:id" component={CandidateView} />
          <Route path="/evaluation/:id" component={Evaluation} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
