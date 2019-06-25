import React, { Component } from "react";
import "./App.css";

//to evaluation added by dilki
//
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");

// import 'materialize-css/dist/css/materialize.min.css'

// import M from 'materialize-css/dist/js/materialize.min.js'

import Login from "./pages/login/login";
import Home from "./components/home";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
//import Navbar from "./components/navbar_metcss";
import fogotpassword from "./pages/fogotpassword/fogotpassword";
import resetpassword from "./pages/resetpassword/resetpassword";
import emailconfirm from "./pages/emailverify/emailverify";
import Addcandidate from "./pages/addCandidate/addCandidate";
import adminlogin from "./pages/adminlogin";
import CandidateView from "./pages/candidateview/CandidateView";
import Evaluation from "./pages/evaluation/evaluation";
import Userprofile from "./pages/userprofile/user";
import Changepass from "./pages/changepass/changepass";
import Avatar from "./pages/avatar";
import Shortlist from "./pages/shortlist/shortlist";
import Drawer from "./components/drawer";
import Pdftest from "./pages/pdftset";
import Search from "./pages/search/search";
import Navbar from "./components/navbar";
import NewUserConfig from "./pages/newuserconfigure/newuserconfigure";
//import profileProvider from "./providers/profileProvides";
import TemporaryDrawer from "./components/sidenav";
//import SidenavContext from "./components/sidenav-context";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TemporaryDrawer />
          <Navbar />
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
          <Route path="/user/:id" component={Userprofile} />
          <Route path="/changepass/:id" component={Changepass} />
          <Route path="/avatar/:id" component={Avatar} />
          <Route path="/shortlist" component={Shortlist} />
          <Route path="/drawer" component={Drawer} />
          <Route path="/pdftest" component={Pdftest} />
          <Route path="/spinner" component={Home} />
          <Route path="/Search" component={Search} />
          <Route path="/newuserconfig/:id" component={NewUserConfig} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
