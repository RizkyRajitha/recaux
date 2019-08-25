import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./restpassword.css";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const jwt = require("jsonwebtoken");
const axios = require("axios");

class resetpassword extends Component {
  state = {
    id: "",
    pass1: "",
    pass2: "",
    passchangeok: false,
    massmissmatch: false,
    exp: false,
    tokendisbled: false
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

      // s
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
          password: this.state.pass1,
          token: this.props.match.params.id
        })
        .then(Response => {
          console.log(Response.data);
          if (Response.data === "password changed succesfully") {
            this.setState({ passchangeok: true });
            setTimeout(() => {
              this.redirectlogin();
            }, 200);
          } else if (Response.data === "tokendisbled") {
            this.setState({ tokendisbled: true });
            // setTimeout(() => {
            //   this.redirectlogin();
            // }, 200);
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
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap align="center">
                RECRUITMENT@AUXENTA
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="container resetpasswordmaindiv ">
            <h1> reset your password </h1>
            {this.state.massmissmatch && (
              <div class="alert alert-warning" role="alert">
                password does not match
              </div>
            )}
            {this.state.tokendisbled && (
              <div class="alert alert-warning" role="alert">
                your password reset link has be used once . please make sure
                this request is valid . or contact a administrator .
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
            </div>{" "}
            <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
              <div class="container text-center">
                <small>Copyright RECRUITMENT@Auxenta &copy; </small>
              </div>
            </footer>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap align="center">
                RECRUITMENT@AUXENTA
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="container resetpasswordmaindiv ">
            <div class="alert alert-warning" role="alert">
              your password reset link has been expired .please try again
            </div>
            <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
              <div class="container text-center">
                <small>Copyright RECRUITMENT@Auxenta &copy; </small>
              </div>
            </footer>
          </div>
        </div>
      );
    }
  }
}

export default resetpassword;
