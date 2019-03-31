import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../../components/navbarloogedin";
import CandidateCard from "../../components/CandidateCard";
import "./dashboard.css";
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
    emailverified: false,
    candidatedata: []
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
    axios
      .get("/usr/getcandidate")
      .then(data => {
        console.log(data);
        this.setState({ candidatedata: data.data });
      })
      .catch(err => {
        console.log(err);
      });
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
            lastName: result.data.lastName
          });

          this.setState({ logedin: true });
          console.log(this.state);
          this.getcandidatedata();
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
      var cndetailes = this.state.candidatedata;
      return (
        <div className="dashboardmain">
          <Navbar />

          
          <h1>
            {this.state.greet} {this.state.firstName} 
          </h1>

          <button
              onClick={this.usrprofile}
              className="btn btn-info"
              id="userprofile"
            >
              edit profile
            </button>

            <br></br>
            <br></br>

            <button
              onClick={this.addcandidate}
              className="btn btn-info"
              id="addcan"
            >
              Add new candidate
            </button>

          {/* <div className="jumbotron">
            <h1 class="display-3">Hello, world!</h1>
            <p class="lead">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <hr class="my-4" />
            <p>
              It uses utility classes for typography and spacing to space
              content out within the larger container.
            </p>
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="/home" role="button">
                Learn more
              </a>
            </p>
          </div> */}

          <div className="container">
            {cndetailes.reverse().map((can, iid) => {
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

          <br></br>
          <br></br>

          {!this.state.emailverified && (
            <div class="alert alert-danger" role="alert">
              please verify your email
              <br />
              <button
                type="button"
                class="btn btn-info"
                onClick={this.verifyemail}
              >
                verify email
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return <Redirect to={`/login`} />;
    }
  }
}

export default dashboard;
