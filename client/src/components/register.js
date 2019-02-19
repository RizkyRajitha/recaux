import React, { Component } from "react";
//import jsonwebtoken from "jsonwebtoken";
import {Redirect} from 'react-router-dom'
import axios from "axios";

class Register extends Component {
  state = {
    email: "",
    registered:false,
    password: ""
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

  componentDidMount() {}

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);

    var config = {
      headers: { authorization: "Header-Value" }
    };

    //axios.post('/save', { firstName: 'Marlon' }, config);

    axios
      .post(
        "http://localhost:3001/usr/reg",
        { email: this.state.email, password: this.state.password },
        config
      )
      .then(response => {
        console.log(response.data);
this.setState({registered:true})
        localStorage.setItem("jwt", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    
    if(this.state.registered===false){
      return (
        <div className="container">
          <div class="row">
            <div class="col-sm" />
            <div class="col-sm">
              <form onSubmit={this.submitHandler}>
                <div class="form-group">
                  <label>username</label>
                  <input
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
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={this.changeHandler}
                    placeholder="enter email"
                  />
                </div>
  
                <div class="form-group">
                  <label>password</label>
                  <input
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
    }else{
      return <Redirect to={'/user'}/>
    }

  }
}

export default Register;
