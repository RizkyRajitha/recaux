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
import Fogotpassword from "./pages/fogotpassword/fogotpassword";
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
import Settings from "./pages/settings/settings";
//import profileProvider from "./providers/profileProvides";
import TemporaryDrawer from "./components/sidenav_mat";
//import SidenavContext from "./components/sidenav-context";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import analyticsdashboard from "./pages/analytics/analyticsdashboard";
import Notfound from "./components/notFound";
import Userlist from "./pages/userlist/userlist";

const jwt = localStorage.getItem("jwt");
const usertype = localStorage.getItem("usertype");

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {jwt ? <TemporaryDrawer /> : ""}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/addcandidate" component={Addcandidate} />
            <Route path="/Login" component={Login} />
            <Route path="/fogotpassword" render={() => <Fogotpassword />} />
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
            <Route path="/search" component={Search} />
            <Route path="/newuserconfig/:id" component={NewUserConfig} />
            <Route path="/analytics" component={analyticsdashboard} />
            {usertype === "admin" ? (
              <Route path="/settings" component={Settings} />
            ) : (
              ""
            )}
            {usertype === "admin" ? (
              <Route path="/userlist" component={Userlist} />
            ) : (
              ""
            )}
            <Route path="*" component={Notfound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
