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
    greet: ""
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

  componentDidMount() {

    this.greet()
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
          <h1>{this.state.greet} buddy {this.state.email}</h1>

          <div class="card  bg-ligh mb-3 w-75">
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

          <div class="card bg-ligh w-75">
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
        </div>
      );
    } else {
      return <Redirect to={`/login`} />;
    }
  }
}

export default dashboard;
