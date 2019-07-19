import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../../App.css";

const jwt = require("jsonwebtoken");
const axios = require("axios");

class resetpassword extends Component {
  state = {
    id: "",
    pass1: "",
    pass2: "",
    passchangeok: false,
    massmissmatch: false,
    exp: false
  };

  componentDidMount() {
    
    try {
      const iid = jwt.verify(this.props.match.params.id, "authdemo");
      console.log(iid.id);
      console.log(iid.id);
      this.setState({ id: iid.id });
    } catch (error) {
     
      this.setState({ exp: true });
      console.log(error);

      setTimeout(() => {
        this.props.history.push("/login");
      }, 2000);
    }
  }

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  redirectlogin = () => {
    this.props.history.push("/login");
  };

  submithandler = e => {
    e.preventDefault();

    console.log("passs - " + this.state.pass1 + "idd -- " + this.state.id);

    var match = this.state.pass1 === this.state.pass2;

    if (match) {
      this.setState({ massmissmatch: false });
      axios
        .post(`/usr/resetpassword/${this.state.id}`, {
          password: this.state.pass1
        })
        .then(Response => {
          console.log(Response.data);
          if (Response.data === "password changed succesfully") {
            this.setState({ passchangeok: true });
            setTimeout(() => {
              this.redirectlogin();
            }, 200);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ massmissmatch: true });
    }
  };

  render() {
    if (!this.state.exp) {
      return (
        <div>
         
          <h1> reset your password </h1>

          {this.state.massmissmatch && (
            <div class="alert alert-warning" role="alert">
              password does not match
            </div>
          )}

          <div className="container">
            <div className="row">
              <div className="col-sm" />
              <div className="col-sm">
                <form onSubmit={this.submithandler}>
                  <div className="form-group">
                    <label>enter your new password</label>
                    <input
                      required
                      type="password"
                      name="pass1"
                      id="pass1"
                      placeholder="enter your new password "
                      className="form-control"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>re enter your new password</label>
                    <input
                      required
                      type="password"
                      name="pass2"
                      id="pass2"
                      placeholder="re enter your password "
                      className="form-control"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="reset password"
                  />   
                </form>
                {this.state.passchangeok === true && (
                  <div>
                    {" "}
                    <h1>password changed succesfully</h1>{" "}
                  </div>
                )}
              </div>
              <div className="col-sm" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1> Link expired </h1>
        </div>
      );
    }
  }
}

export default resetpassword;
