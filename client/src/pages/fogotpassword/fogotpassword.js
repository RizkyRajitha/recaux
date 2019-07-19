import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class fogotpassword extends Component {
  state = {
    email: "",
    errnotfound: false,
    succsee: false
  };
  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  btn1handler = e => {
    e.preventDefault();
    console.log("inform");

    axios
      .post("/usr/fogotpassword", { email: this.state.email })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data === "no_user_found") {
          console.log("no user found ");
          this.setState({ errnotfound: true });
        } else {
          console.log("email send successfullly");
          this.setState({ succsee: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if (this.state.errnotfound) {
      return (
        <div>
          {" "}
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Recruitement @ Auxenta
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <br />
          <h1> please check your email and try again </h1>
        </div>
      );
    } else if (this.state.succsee) {
      return (
        <div role="">
           <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Recruitement @ Auxenta
                </Typography>
              </Toolbar>
            </AppBar>
          <br />
          <h1> reset link set to your email </h1>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Recruitement @ Auxenta
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <h1>we all forget and that's cool </h1>

          <h1> just enter your registered email</h1>
          <div className="container">
            <div className="row">
              <div className="col-sm" />
              <div className="col-sm">
                <form onSubmit={this.btn1handler}>
                  <div className="form-group">
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="enter your email "
                      className="form-control"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="verifiy"
                  />
                </form>
              </div>
              <div className="col-sm" />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default fogotpassword;
