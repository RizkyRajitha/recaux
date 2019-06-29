import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import ChipsArray from "./components/skillschipsWithDelete";

const jsonwebtoken = require("jsonwebtoken");

const axios = require("axios");

class Settings extends Component {
  state = { skillset: "", newskill: "" };

  componentDidMount() {
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .get("/usr/skilllist", config)
      .then(res => {
        console.log("skillset - - ");
        console.log(res.data.skills);

        this.setState({ skillset: res.data.skills });
      })
      .catch(err => {});
  }

  valtokey = () => {
    var arr = this.state.skillset;

    var keyrr = [];

    arr.forEach(element => {
      keyrr.push({ key: element.value, label: element.label });
    });
    return keyrr;
  };

  addskill = () => {
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    console.log(this.state);

    axios
      .post("/usr/addnewskill", { skill: this.state.newskill }, config)
      .then(res => {
        console.log(res.data);
        this.setState({ skillset: res.data.skills });
        //this.forceUpdate();
        //setselectoptionsnamelist(res.data.skills);
      })
      .catch(err => {});
  };

  hndleskillchange = e => {
    // console.log(e.target.value);
    this.setState({ newskill: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Settings</h1>

        <input type="text" onChange={this.hndleskillchange} />
        <button onClick={this.addskill}>add</button>

        {this.state.skillset && <ChipsArray currentskills={this.valtokey} />}
      </div>
    );
  }
}

export default Settings;
