import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  state = {
    email: "",
    registered: false,
    password: "",
    firstname: "",
    lastname: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  // changeHandlerPassword = e => {
  //   console.log(
  //     `ps1 ${this.state}  ps2 ${e.target.value} +++ ${this.state.passsword !=
  //       e.target.value}`
  //   );

  //   if (this.state.passsword !== String(e.target.value).trim) {
  //     console.log(
  //       "no match " + this.state.password + "  " + e.target.value + "-"
  //     );
  //     document.querySelector(".psscheck").innerHTML = "password dont match ";
  //   } else {
  //     // this.setState({
  //     //   password2: e.target.value
  //     // });
  //     console.log("match");
  //     document.querySelector(".psscheck").innerHTML = "password  match ";
  //   }
  // };

  componentDidMount() {
    const jwt = localStorage.getItem("jwt");
    console.log('jwt token -- - -- >>>'+jwt);

    try {
      console.log("in register");
      var pay = jsonwebtoken.verify(jwt, "authdemo");
      console.log('payload - '+pay);
      console.log('************************************' )

      
    } catch (error) {
      console.log("not logged in redirecting...............");

      //e.preventDefault();
      this.props.history.push("/Login");
    }
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    //axios.post('/save', { firstName: 'Marlon' }, config);

    axios
      .post(
        "/usr/reg",
        {
          email: this.state.email,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname
        },
        config
      )
      .then(response => {
        console.log("resonse came - -");
        console.log(response.data);
        this.setState({ registered: true });
        localStorage.setItem("jwt", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.registered === false) {
      return (
        <div className="container">
          <div class="row">
            <div class="col-sm" />
            <div class="col-sm">
              <form onSubmit={this.submitHandler}>
                <div class="form-group">
                  <label>username</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="enter username"
                    onChange={this.changeHandler}
                  />
                </div>

                <div class="form-group">
                  <label>email</label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={this.changeHandler}
                    placeholder="enter email"
                  />
                </div>

                <div class="form-group">
                  <label>first Name</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="firstname"
                    onChange={this.changeHandler}
                    placeholder="enter firstname"
                  />
                </div>

                <div class="form-group">
                  <label>last Name</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="lastname"
                    onChange={this.changeHandler}
                    placeholder="enter lastname"
                  />
                </div>

                <div class="form-group">
                  <label>password</label>
                  <input
                    required
                    type="password"
                    id="password"
                    placeholder="enter password"
                    className="form-control"
                    onChange={this.changeHandler}
                  />
                </div>

                {/* <div class="form-group">
                  <label>re enter password</label>
                  <input
                    type="password"
                    id="password2"
                    placeholder="enter password again"
                    onChange={this.changeHandlerPassword}
                    className="form-control"
                  />
                  <label className="psscheck" />
                </div> */}
                <input type="submit" class="btn btn-primary" value="sign in" />
              </form>
            </div>
            <div class="col-sm" />
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/dashboard"} />;
    }
  }
}

export default Register;
