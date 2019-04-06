import React, { Component } from "react";
import Navbar from "../../components/navbarloogedin";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import "./changepass.css";

class Changepass extends Component {
  state = {
    pass1: "",
    pass2: "",
    id: "",
    errorpassmatch:false,
    passchngsuccess:false
  };
  changeHandler = e => {
    //console.log(e.target.name,)
    this.setState({ [e.target.name]: e.target.value });

    console.log(this.state);
  };

  componentWillMount() {
    this.setState({ id: this.props.match.params.id });
    //var jwt = localStorage.getItem('jwt')

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

  submitHndl = e => {
    e.preventDefault();

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };
    console.log(this.state);

    var massmacth = this.state.pass1 === this.state.pass2;
    console.log(massmacth)

    if (massmacth) {
      this.setState({
        errorpassmatch: false
      });
      axios
        .post(
          "/usr/changepass/" + this.state.id,
          { password: this.state.pass1 },
          config
        )
        .then(response => {
          console.log(response);
          this.setState({passchngsuccess:true})
        })
        .catch(err => {
          console.log(err);
        });
    }else{
this.setState({errorpassmatch:true})
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <br />

        <div className="maindivchngpass">
          <div className="row">
            <div className="col-sm" />
            <div className="col-sm">
            {this.state.errorpassmatch && (<div class="alert alert-warning" role="alert">
  password does not match
</div>)}

{this.state.passchngsuccess && (<div class="alert alert-success" role="alert">
password changed successfully
</div>)}
              <form onSubmit={this.submitHndl}>
                <div class="form-group">
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="pass1"
                    name="pass1"
                    onChange={this.changeHandler}
                    placeholder="enter new password"
                  />
                </div>
                <div class="form-group">
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="pass2"
                    name="pass2"
                    onChange={this.changeHandler}
                    placeholder="re enter new password"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="change password"
                />
              </form>
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default Changepass;
