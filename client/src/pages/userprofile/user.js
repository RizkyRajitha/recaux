import React, { Component } from "react";
import Navbar from "../../components/navbarloogedin";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import "./user.css";

class Userprofile extends Component {
  state = {
    firstName: "",
    email: "",
    lastName: "",
    login: false,
    success: false,
    addedsucsess: 0,
    expat: new Date(),
    nullfielderr: false,
    userdata: {}
  };
  chngehandlfname = e => {
    this.state.userdata.firstName = e.target.value;
    this.forceUpdate();
    console.log(this.state.userdata);
  };

  chngehandllname = e => {
    this.state.userdata.lastName = e.target.value;
    this.forceUpdate();
    console.log(this.state.userdata);
  };

  chngehandlemail = e => {
    this.state.userdata.email = e.target.value;
    this.forceUpdate();
    console.log(this.state.userdata);
  };

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

    console.log(this.props.match.params.id);

    axios
      .get("/usr/user/" + this.props.match.params.id)
      .then(res => {
        this.setState({ userdata: res.data });
        console.log(res);
        console.log("---------");
        console.log(this.state.userdata);
      })
      .catch(err => {
        console.log(err);
      });
  }

  btn1handler = e => {
    e.preventDefault();

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var dto = {
      email: this.state.userdata.email,
      firstName: this.state.userdata.firstName,
      lastName: this.state.userdata.lastName
    };

    console.log("data edit" + dto.email);
    console.log("data edit" + dto.firstName);
    console.log("data edit" + dto.lastName);

    axios
      .post("/usr/edituser/" + this.state.userdata.id, dto, config)
      .then(response => {
        console.log("resonse came - -");
        console.log(response.data);
        this.setState({ sucsess: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ sucsess: false });
      });
  };

  chngpss = e => {
    this.props.history.push("/changepass/" + this.props.match.params.id);
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="maindivuser">
          <div className="row">
            <div className="col-sm" />
            <div className="col-sm">
              {this.state.success && (
                <div class="alert alert-success" role="alert">
                  updated successfully
                </div>
              )}

              <img src='' />

              <form onSubmit={this.btn1handler}>
                <br />
                <br />
                <br />
                <div className="form-group">
                <lable>First Name</lable>
                  <input
                    required
                    type="text"
                    name="firstName"
                    className="form-control"
                    onChange={this.chngehandlfname}
                    placeholder="enter first name"
                    id="firstName"
                    value={this.state.userdata.firstName}
                  />
                </div>

                <div className="form-group">
                <label>Last Name</label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    className="form-control"
                    onChange={this.chngehandllname}
                    placeholder="enter last name"
                    id="lastName"
                    value={this.state.userdata.lastName}
                  />
                </div>

                <div className="form-group">
                <label>Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="enter candidate email"
                    onChange={this.chngehandlemail}
                    id="email"
                    value={this.state.userdata.email}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary"
                  value="save edited details"
                />
              </form>
                <br/>
              <button className="btn btn-primary" onClick={this.chngpss}>
                change password
              </button>

              <br />
            </div>
            <div className="col-sm" />
          </div>
        </div>
      </div>
    );
  }
}

export default Userprofile;
