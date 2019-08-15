import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import ChipsArray from "./components/skillschipsettings";
import ChipsArray2 from "./components/jobspecchipsettings";
import "./settings.css";
const jsonwebtoken = require("jsonwebtoken");

const axios = require("axios");

class Settings extends Component {
  state = { skillset: "", newskill: "", jobspecset: "" };

  componentDidMount() {
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    }; //jobspeclist

    axios
      .get("/usr/skilllist", config)
      .then(res => {
        console.log("skillset - - ");
        console.log(res.data.skills);

        this.setState({ skillset: res.data.skills });
      })
      .catch(err => {});

    axios
      .get("/usr/getjobspeclist", config)
      .then(res => {
        console.log("skillset - - ");
        console.log(res.data.jobspeclist);

        this.setState({ jobspecset: res.data.jobspeclist });
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

  valtokeyjobs = () => {
    var arr = this.state.jobspecset;

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
      .post("/usr/addnewjobspec", { skill: this.state.newskill }, config)
      .then(res => {
        console.log(res.data);
        this.setState({ skillset: res.data.jobs });
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
        <div className="settingsmaindiv">
          <h1>Preferances</h1>

          {/* <input type="text" onChange={this.hndleskillchange} />
        <button onClick={this.addskill}>add</button> */}
          {/* <ChipsArray2 /> */}

          {this.state.jobspecset && (
            <ChipsArray2 currentjobspecs={this.valtokeyjobs} />
          )}

<div className='paddingdivsettings' ></div>

          {this.state.skillset && <ChipsArray currentskills={this.valtokey} />}
        </div>
      </div>
    );
  }
}

export default Settings;
