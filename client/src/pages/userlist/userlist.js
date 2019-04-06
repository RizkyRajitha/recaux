import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
//import "./login.css";
//import "materialize-css";
import Navbar from "../../components/navbar";

const jsonwebtoken = require("jsonwebtoken");

const axios = require("axios");

class Userlist extends Component {
  state = {
   }

   render(){
       return(
           <div>
               <h1>User List</h1>
           </div>
       )
       }
}

export default Userlist;
