import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";

const jsonwebtoken = require("jsonwebtoken");
const axios = require("axios");

class resetpassword extends Component {
  state = {
    id: "",
    pass1: "",
    pass2: "",
    passchangeok: false
  };

  componentDidMount() {
    var id = this.props.match.params.id;
    console.log(id);
    this.setState({ id: id });
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
  };

  render() {
    return (
      <div>
        <h1> reset your password </h1>

        <div className="container">
          <div className="row">
            <div className="col-sm" />
            <div className="col-sm">
              <form onSubmit={this.submithandler}>
                <div className="form-group">
                  <label>enter your new password</label>
                  <input
                    type="text"
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
                    type="text"
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
  }
}

export default resetpassword;
