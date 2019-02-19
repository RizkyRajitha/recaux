import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import axios from "axios";

const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");

class user extends Component {
  state = {
    logedin: true,
    email: ""
  };

  componentDidMount() {
    console.log("mount");

    var jwt = localStorage.getItem("jwt");

    // try {
    //   var user = jsonwebtoken.verify(jwt)
    //   if(user){
    //     this.setState({logedin:true})
    //   }
    // } catch (error) {
    //   this.setState({logedin:true})
    //   console.log(error)

    // }

    var config = {
      headers: { authorization: jwt }
    };
    axios
      .get("http://localhost:3001/usr/dashboard", config)
      .then(result => {
        console.log("sucsess" + result.data);
        if (result.data) {
          console.log(result.data);
          this.setState({ email: result.data.email });

          this.setState({ logedin: true });
        } else {
          this.setState({ logedin: false });
        }
      })
      .catch(err => {
        this.setState({ logedin: false });
        console.log("error" + err);
      });
  }

  render() {
    if (this.state.logedin == true) {
      return (
        <div className="App">
          <h1>HI budddy {this.state.email}</h1>
        </div>
      );
    } else {
      return <Redirect to={`/login`} />;
    }
  }
}

export default user;
