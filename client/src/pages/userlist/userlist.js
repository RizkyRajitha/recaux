import React, { Component } from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import UserCard from "./components/usercard";
import Avatar from "@material-ui/core/Avatar";
import "./userlist.css";
const jsonwebtoken = require("jsonwebtoken");

const axios = require("axios");

class Userlist extends Component {
  state = { isLoading: false, userdata: "", temp: [], seachname: "" };

  componentDidMount() {
    this.setState({ isLoading: true });
    const usertype = localStorage.getItem("usertype");

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    if (usertype === "admin" || usertype === "hr_staff") {
      axios
        .get("/usr/userdata", config)
        .then(data => {
          console.log("user data - - - " + data.data);
          this.setState({ userdata: data.data, temp: data.data });
          console.log(this.state);
          this.setState({ isLoading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
  }

  searchbyname = nameKey => {
    var temparr = [];
    this.setState({ seachname: nameKey });
    for (var i = 0; i < this.state.temp.length; i++) {
      var fullname =
        this.state.temp[i].firstName + " " + this.state.temp[i].lastName;

      console.log(fullname);
      if (fullname.toLowerCase().match(nameKey.toLowerCase())) {
        temparr.push(this.state.temp[i]);
      }
    }
    this.setState({ userdata: temparr });
  };

  seachbyrole = nameKey => {
    console.log(nameKey);
    var temparr = [];

    if (nameKey === "default") {
      this.setState({ userdata: this.state.temp });
    } else {
      for (var i = 0; i < this.state.temp.length; i++) {
        if (this.state.temp[i].usertype === nameKey) {
          temparr.push(this.state.temp[i]);
        }
      }
      this.setState({ userdata: temparr });
    }
  };

  seachbystate = nameKey => {
    console.log(nameKey);
    var temparr = [];
    if (nameKey === "default") {
      this.setState({ userdata: this.state.temp });
    } else {
      for (var i = 0; i < this.state.temp.length; i++) {
        if (nameKey === "active") {
          if (!this.state.temp[i].state) {
            temparr.push(this.state.temp[i]);
          }
        } else if (nameKey === "inactive") {
          if (this.state.temp[i].state) {
            temparr.push(this.state.temp[i]);
          }
        }
      }
      this.setState({ userdata: temparr });
    }
  };

  render() {
    var usrdetails = this.state.userdata;

    return (
      <div>
        <div class="loader-userlist" hidden={!this.state.isLoading} />
        <div className=" container userlistmaindiv">
          <div className="form-row">
            <div class="form-group  col-md-4 ">
              <label for="exampleFormControlSelect99">User name</label>
              <input
                id="exampleFormControlSelect99"
                class="form-control"
                placeholder="Enter user name"
                type="text"
                value={this.state.seachname}
                onChange={e => {
                  this.searchbyname(e.target.value);
                }}
              />
            </div>
            <div class="form-group col-md-4 ">
              <label for="exampleFormControlSelect1">User Role</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={e => this.seachbyrole(e.target.value)}
              >
                <option value="default">Select one</option>
                <option value="admin">Admin</option>
                <option value="hr_staff">Human resource staff </option>
                <option value="depthead">Departmant Head</option>
              </select>
            </div>

            <div class="form-group col-md-4  ">
              <label for="exampleFormControlSelect1">User state</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={e => this.seachbystate(e.target.value)}
              >
                <option value="default">Select one</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive </option>
              </select>
            </div>
            <button
              className="btn"
              onClick={() => {
                this.setState({ userdata: this.state.temp });
                this.setState({ seachname: "" });
              }}
            >
              clear <i class="far fa-times-circle" />
            </button>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Name</th>
                <th scope="col">Pending Shortlists</th>
                <th scope="col">State</th>
              </tr>
            </thead>
            <tbody>
              {usrdetails[0] &&
                usrdetails.map(can => {
                  // console.log(can.name + can.email + can.jobspec);
                  return (
                    <tr>
                      <th scope="row">
                        <Avatar
                          alt="Remy Sharp"
                          src={can.avatarUrl}
                          style={{ margin: 10, width: 60, height: 60 }}
                          onClick={() => {
                            this.props.history.push("/user/" + can.id);
                          }}
                          //className={classes.avatar}
                        />
                      </th>
                      <td>
                        <a href={"/user/" + can.id}>
                          {can.firstName + " " + can.lastName}
                        </a>
                        <br />
                        <span className="userlistusertypespan">
                          {can.usertype === "admin" ? "Admin" : ""}
                          {can.usertype === "hr_staff"
                            ? "Human resource staff"
                            : ""}
                          {can.usertype === "depthead" ? "Departmant Head" : ""}
                        </span>
                      </td>
                      <td>{can.candidatesAssinged}</td>
                      <td>
                        {" "}
                        <span
                          className={`badge badge-pill ${
                            can.state ? "badge-warning" : "badge-success"
                          }`}
                        >
                          {can.state ? "Disabled" : "Active"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Userlist);
