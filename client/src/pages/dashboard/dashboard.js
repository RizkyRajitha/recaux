import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CandidateCard from "../../components/CandidateCard";
import UserCard from '../../components/usercard'
import "./dashboard.css";
import Navbar from "../../components/navbar";
import axios from "axios";
const jsonwebtoken = require("jsonwebtoken");

//import { CandidateCard } from "./CandidateCard";
// const request = require("request");

class dashboard extends Component {
  state = {
    logedin: true,
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    greet: "",
    usertype: "",
    emailverified: false,
    candidatedata: [],
    userdata: []
  };

  verifyemail = () => {
    //this.props.history.push('/fogotpassword')
    axios
      .post("/usr/sendconfirmemail/" + this.state.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  greet = () => {
    var now = new Date();
    var hour = now.getHours();
    console.log(hour);
    if (hour > 18 && hour < 23) {
      this.setState({ greet: "Good night" });
    } else if (hour > 16 && hour < 18) {
      this.setState({ greet: "Good evening" });
    } else if (hour > 12 && hour < 16) {
      this.setState({ greet: "Good afternoon" });
    } else {
      this.setState({ greet: "Good morning" });
    }
  };

  reg = e => {
    e.preventDefault();
    this.props.history.push("/register");
  };

  usrprofile = e => {
    e.preventDefault();
    this.props.history.push("/user/" + this.state.id);
  };

  addcandidate = e => {
    e.preventDefault();
    this.props.history.push("/addcandidate");
  };

  getcandidatedata = () => {
    console.log("in candidate  data");
    axios
      .get("/usr/getcandidate")
      .then(data => {
        console.log("candidate data - - - " + data.data);
        this.setState({ candidatedata: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getuserdata = () => {
    console.log("in user data");
    console.log("usr type" + this.state.usertype);
    console.log(this.state);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    if (this.state.usertype === "admin") {
      axios
        .get("/usr/userdata", config)
        .then(data => {
          console.log("user data - - - " + data.data);
          this.setState({ userdata: data.data });
          console.log(this.state);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.greet();
    console.log("mount");

    var jwt = localStorage.getItem("jwt");
    var now = new Date();
    console.log(now.getHours());

    // try {
    //   var dashboard = jsonwebtoken.verify(jwt)
    //   if(dashboard){
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
      .get("/usr/dashboard", config)
      .then(result => {
        console.log("sucsess" + result.data);
        if (result.data) {
          console.log("menna apu data");
          console.log(result.data);

          this.setState({
            email: result.data.email,
            emailverified: result.data.emailverified,
            id: result.data.id,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            usertype: result.data.usertype
          });

          this.setState({ logedin: true });
          //console.log(this.state);
          this.getcandidatedata();
          this.getuserdata();

          localStorage.setItem("userId", result.data.id);
        } else {
          this.setState({ logedin: false });
        }
      })
      .catch(err => {
        this.setState({ logedin: false });
        console.log("error" + err);
      });

    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  }

  render() {
    if (this.state.logedin == true) {
      var cndetailes = this.state.candidatedata;
      var usrdetails = this.state.userdata;
      return (
        <div className="dashboardmain">
          <Navbar />
          <h1 className="greet">
            {this.state.greet} {this.state.firstName}
          </h1>
          <br />
          <br />
          <button
            onClick={this.usrprofile}
            className="btn btn-info"
            id="userprofile"
          >
            edit profile
          </button>
          <br />
          <br />

          <button
            onClick={this.addcandidate}
            className="btn btn-info"
            id="addcan"
          >
            Add new candidate
          </button>

          {!this.state.emailverified && (
            
              <div class="alert alert-danger" role="alert">
                please verify your email
                <br />
                <button
                  type="button"
                  class="btn btn-outline-danger "
                  id="verifyemailbtn"
                  onClick={this.verifyemail}
                >
                  verify email
                </button>
              </div>
           
          )}

          <div class="row">
            <div class="col-s4-m4-l4" id="cardcontainer1">
              {usrdetails.reverse().map((can) => {
                //console.log(can.name+can.email+can.jobspec)
                return (
                  <UserCard
                    name={can.firstName+ ' '+can.lastName}
                    pendingcan={can.candidatesAssinged}
                  />
                );
              })}
            </div>

            <div class="col-s8 " id="cardcontainer2">
              {cndetailes.map((can, iid) => {
                //console.log(can.name+can.email+can.jobspec)
                return (
                  <CandidateCard
                    name={can.name}
                    email={can.email}
                    jobspec={can.jobspec}
                    _id={can._id}
                    date={can.date}
                    status={can.status}
                  />
                );
              })}
            </div>
          </div>

          <br />
          <br />
        </div>
      );
    } else {
      return <Redirect to={`/login`} />;
    }
  }
}

export default dashboard;
