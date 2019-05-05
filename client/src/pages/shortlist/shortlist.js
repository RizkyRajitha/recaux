import React, { Component } from "react";
// import "./evaluation.css";
import jsonwebtoken from "jsonwebtoken";
import Navbar from "../../components/navbar";

const axios = require("axios");

class Shortlist extends Component {
  state = {};

  componentDidMount() {
    console.log("in shotlist");
    var jwt = localStorage.getItem("jwt");
    try {
      var dashboard = jsonwebtoken.verify(jwt,'authdemo');
      if (!dashboard) {
       // this.props.history.push("/login");
      }
    } catch (error) {
      this.props.history.push("/login");
      console.log(error);
    }

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var id = localStorage.getItem("userId");
    console.log("userid- " + id);

    axios
      .get("/usr/getshortlistdata/" + id, config)
      .then(res => {
          console.log(res.data)
      })
      .catch(err => {});
  }

  render() {
    return (
      <div>
        <Navbar />
        Shortlist
        <div />
      </div>
    );
  }
}

export default Shortlist;
