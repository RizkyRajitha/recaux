import React, { Component } from "react";
import Navbar from '../../components/navbarloogedin'
const jwt = require("jsonwebtoken");
const axios = require("axios");


class Addcandidate extends Component {
  state = {
    name: "",
    email: "",
    jobspec: "",
    login: false,
    addedsucsess: 0,
    expat: new Date(),
    nullfielderr: false
  };
  chngehandl = e => {
    //console.log(e.target.name,)
    this.setState({ [e.target.name]: e.target.value });

    //console.log(this.state);
  };

  componentDidMount() {
    //this.setState({nullfielderr:false})
    var token = localStorage.getItem("jwt");
    try {
      var data = jwt.verify(token, "authdemo");
      console.log(data);
      if (data) {
        this.setState({ login: true });
      }
    } catch (error) {
      console.log(error);
      if (error) {
        this.setState({ expat: error.expiredAt });
        this.setState({ login: false });

        //console.log(error.expiredAt.getHour())//+"  "+error.expiredAt.getMinutes())
      }
    }
  }

  btn1handler = e => {
    this.setState({ addedsucsess: 0 });
    e.preventDefault();
    var can = this.state;
    if (can.name && can.email && can.jobspec) {
      console.log("submited");
      var params = new URLSearchParams();
      params.append("candidatename", this.state.name);
      params.append("candidateemail", this.state.email);
      params.append("candidatejobspec", this.state.jobspec);
      this.setState({ addedsucsess: false });
      axios
        .post("/usr/addcandidate", params)
        .then(data => {
          console.log(data.data);
          this.setState({ addedsucsess: 2, name: "", jobspec: "", email: "" });
        })
        .catch(err => {
          this.setState({ addedsucsess: 1 });
          console.log(err);
        });

      document.querySelector("#name").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#job").value = "";
      this.setState({ nullfielderr: false });
    } else {
      this.setState({ nullfielderr: true });
    }
  };

  render() {
    if (this.state.login) {
      return (
        <div>
          < Navbar/>
          <div className="container">
            <div className="row">
              <div className="col-sm" />
              <div className="col-sm">
                {this.state.addedsucsess == 2 && (
                  <div class="alert alert-success" role="alert">
                    candidate added successfully
                  </div>
                )}
                {this.state.nullfielderr && (
                  <div class="alert alert-danger" role="alert">
                    please fill the form
                  </div>
                )}
                {this.state.addedsucsess == 1 && (
                  <div class="alert alert-danger" role="alert">
                    error occured connecting to the server
                  </div>
                )}

                <form onSubmit={this.btn1handler}>
                  <br />
                  <br />
                  <br />
                  <div className="form-group">
                    <input
                    required
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={this.chngehandl}
                      placeholder="enter candidate name"
                      id="name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                    required
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="enter candidate email"
                      onChange={this.chngehandl}
                      id="email"
                    />
                  </div>
                  <div className="form-group">
                    <label> </label>
                    <input
                    
                    required
                      type="text"
                      name="jobspec"
                      className="form-control"
                      placeholder="enter candidate job spec"
                      onChange={this.chngehandl}
                      id="job"
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="add"
                  />
                </form>

                <br />
              </div>
              <div className="col-sm" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>
            Session expired at {this.state.expat.toString()}please login to
            continue
          </h1>
        </div>
      );
    }
  }
}

export default Addcandidate;
