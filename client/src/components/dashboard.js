import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import axios from "axios";
const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");

class dashboard extends Component {
  state = {
    logedin: true,
    email: "",
    id: "",
    greet: "",
    emailverified: false,
    candidatedata : []
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
  addcandidate = e => {
    e.preventDefault();
    this.props.history.push("/addcandidate");
  };

  getcandidatedata = () => [
    axios
      .get("/usr/getcandidate")
      .then(data => {
        console.log(data);
        this.state.andidatedata = data.data
      })
      .catch(err => {
        console.log(err);
      })
  ];

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
          console.log(result.data);
          this.setState({
            email: result.data.email,
            emailverified: result.data.emailverified,
            id: result.data.id
          });

          this.setState({ logedin: true });

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
      return (
        <div className="App">
          <h1>
            {this.state.greet} buddy {this.state.email}
          </h1>

          <button onClick={this.reg} className="btn btn-info">
            register new user
          </button>
          <br />
          <br />
          <button onClick={this.addcandidate} className="btn btn-info">
            add new candidate
          </button>

          <div class="card  bg-dark mb-3 w-75">
            <div class="card-body">
              <h5 class="card-title">jayasinghe</h5>
              <p class="card-text">
                <ul>
                  <li>job spechification : Quality Assuarance Engineer</li>
                </ul>
              </p>
              <a href="/candidate/" class="btn btn-primary">
                view
              </a>
            </div>
          </div>

          {this.candidatedata.forEach(element => {
                      (<div class="card  bg-dark mb-3 w-75">
                      <div class="card-body">
                        <h5 class="card-title">{element.name}</h5>
                        <p class="card-text">
                          <ul>
                            <li>job spechification : {element.jobspec }</li>
                          </ul>
                        </p>
                        <a href="/candidate/" class="btn btn-primary">
                          view
                        </a>
                      </div>
                    </div>)
          })}


          <div class="card bg-dark w-75">
            <div class="card-body">
              <h5 class="card-title">Pasidu Perera </h5>
              <p class="card-text">
                <ul>
                  <li>job spechification : Senior Software Engineer</li>
                </ul>
              </p>
              <a href="/candidate/" class="btn btn-primary">
                view
              </a>
            </div>
          </div>
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
