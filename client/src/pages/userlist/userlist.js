import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import UserCard from "./components/usercard";
const jsonwebtoken = require("jsonwebtoken");

const axios = require("axios");

class Userlist extends Component {
  state = { isLoading: false, userdata: "" };

  componentDidMount() {
    const usertype = localStorage.getItem("usertype");

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    if (usertype === "admin") {
      axios
        .get("/usr/userdata", config)
        .then(data => {
          console.log("user data - - - " + data.data);
          this.setState({ userdata: data.data });
          console.log(this.state);
          this.setState({ isLoading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    var usrdetails = this.state.userdata;

    return (
      <div>
        
        <Container style={{width:"80%"}} >
        <h1>User List</h1>
          {(
             <Container  >
              {usrdetails[0] &&  usrdetails.map(can => {
                console.log(can.name+can.email+can.jobspec)
                return (
                  <UserCard
                    name={can.firstName + " " + can.lastName}
                    pendingcan={can.candidatesAssinged}
                    id={can.id}
                    state={can.state}
                    avatar={can.avatarUrl}
                  />
                );
              })}
          </Container>
          )}
        </Container>
      </div>
    );
  }
}

export default Userlist;
