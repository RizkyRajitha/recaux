import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
const jsonwebtoken = require("jsonwebtoken");
//const request = require("request");
const axios = require("axios");

class adminlogin extends Component {
  state = {
    token: "",
    // email: "",
    // password: "",

    loggedIn: false,
    showError: false,
    showNullError: false
  };

  changehandleremail = event => {
    this.setState({
      email: event.target.value
    });
  };

  changehandlerpass = event => {
    this.setState({
      password: event.target.value
    });
  };

  componentDidMount() {
    var jwt = localStorage.getItem("jwt");
    console.log("comp mount");
    console.log(jwt);
    try {
      var tk = jsonwebtoken.verify(jwt, "authdemo");
      if (tk) {
        console.log("loged in");
        this.setState({
          loggedIn: true,
          email: tk.email
        });
      }
    } catch (error) {
      console.log("not logged in" + error);

      this.setState({
        loggedIn: false
      });
    }
  }

  fogotpasswordhandler = () => {
    this.props.history.push("/fogotpassword");
  };

  btn1handler = e => {
    e.preventDefault();

    console.log("cliking");

    if (this.state.email === "" || this.state.password === "") {
      console.log(this.state.email + "   " + this.state.password);
      console.log("wtf");
      this.setState({
        loggedIn: false,
        showError: false,
        showNullError: true
      });
    } else {
      console.log("sending..............");
      console.log(this.state.email + this.state.password);

      var params = new URLSearchParams();
      params.append("email", this.state.email);
      params.append("password", this.state.password);
      // data: {
      //   email: this.state.email,
      //   password: this.state.password
      // }

      axios
        .post("/usr/login1", params)
        .then(data => {
          console.log(data);
          var body = data.data;
          console.log("body - " + body);
          localStorage.setItem("jwt", body);

          this.setState({
            loggedIn: true,
            showError: false,
            showNullError: false
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loggedIn: false,
            showError: true,
            showNullError: false
          });
        });

      // axios.post("/usr/login1", params, (err, res, body) => {
      //   console.log("errr - " + err);
      //   console.log("response - " + res);
      //   console.log("body - " + body);

      //   if (body !== "false") {
      // console.log("body - " + body);
      // localStorage.setItem("jwt", body);

      // this.setState({
      //   loggedIn: true,
      //   showError: false,
      //   showNullError: false
      // });
      //   } else {
      //     console.log(err);
      // this.setState({
      //   loggedIn: false,
      //   showError: true,
      //   showNullError: false
      // });
      //   }

      //   // this.setState({ email: data.email, id: data.id });
      // });
    }
  };

  render() {
    const { email, password, showError, loggedIn, showNullError } = this.state;

    if (!loggedIn) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm" />
            <div className="col-sm">
              <form onSubmit={this.btn1handler}>
                <br />
                <br />
                <br />
                <div className="form-group">
                  <label> enter username </label>
                  <input
                    type="text"
                    name="uname"
                    className="form-control"
                    onChange={this.changehandleremail}
                    placeholder="enter user name"
                  />
                </div>
                <div className="form-group">
                  <label> enter password </label>
                  <input
                    type="text"
                    name="pass"
                    className="form-control"
                    placeholder="enter password"
                    onChange={this.changehandlerpass}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="sign in"
                />
              </form>
              <br />
              <input
                type="button"
                className="btn btn-primary"
                value="fogot password"
                onClick={this.fogotpasswordhandler}
              />

              {showNullError && (
                <div>
                  <p>The username or password cannot be null.</p>
                </div>
              )}

              {showError && (
                <div>
                  <p>The username or password is incorrect dude XD.</p>
                </div>
              )}
            </div>
            <div className="col-sm" />
          </div>
        </div>
      );
    } else {
      return <Redirect to={`/dashboard`} />;
    }
  }
}

export default adminlogin;
