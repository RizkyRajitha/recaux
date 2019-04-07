import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import Navbar from '../../components/navbarloogedin'
import axios from "axios";

class Register extends Component {
  state = {
    email: "",
    registered: false,
    password1: "",
    password2: "",
    firstname: "",
    lastname: "",
    usertype:"",
    errorpassmatch:false,
    duplicateemalifound:false,
    noPrev:false
  };

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });

    console.log(this.state)
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

    const passmatch = this.state.password1===this.state.password2
    

    console.log(passmatch)

    if(passmatch){
      this.setState({
        errorpassmatch:false
        })
      axios
      .post(
        "/usr/reg",
        {
          email: this.state.email,
          password: this.state.password1,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          usertype:this.state.usertype
        },
        config
      )
      .then(response => {
        console.log("resonse came - -");
        console.log(response.data);
        this.setState({ registered: true });
        //localStorage.setItem("jwt", response.data);
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data==11000);

        if(err.response.data==11000){
            this.setState({duplicateemalifound:true})
            document.querySelectorAll('.form-group').value=''
        }

        if(err.response.data=='no_previladges'){
          this.setState({noPrev:true})

          setTimeout(()=>{
            this.props.history.push("/dashboard");
          },5000)

          //document.querySelectorAll('.form-group').value=''
      }
        //if(err)
      });
    }
    else{

      this.setState({ errorpassmatch:true })
    }

   
  };

  chngehandlsel =e=>{

    this.setState({usertype:e.target.value})

  }

  render() {
    if (this.state.registered === false) {
      return (
        <div >
        <Navbar/>
          <div class="row">
            <div class="col-sm" />
            <div class="col-sm">
              <form onSubmit={this.submitHandler}>
                
                <br></br>
                <br></br>

                {this.state.errorpassmatch && (<div class="alert alert-warning" role="alert">
  password does not match
</div>)}
{this.state.duplicateemalifound && (<div class="alert alert-warning" role="alert">
Duplicate email Found
</div>)}
{this.state.noPrev && (<div class="alert alert-warning" role="alert">
You have no Previladges to add new users, please contact your Administrator
</div>)}
                <div class="form-group">
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
                  
                  <input
                    required
                    type="password"
                    id="password1"
                    placeholder="enter password"
                    className="form-control"
                    onChange={this.changeHandler}
                  />
                </div>

                <div class="form-group">
                  
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="password2"
                    placeholder="re enter password"
                    onChange={this.changeHandler}
                  />
                </div>

                <div class="form-group">
            <label for="exampleFormControlSelect2">
              select user type
            </label>
            <select
              class="form-control"
              id="status"
              onChange={this.chngehandlsel}
            >
              <option selected>Select...</option>
              <option id="status" value="hr_staff">
                HR staff
              </option>
              <option id="status" value="depthead">
                Department head
              </option>
              <option id="status" value="admin">
                Admin
              </option>
              
            </select>
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
                <input type="submit" class="btn btn-primary" value="Add User" />
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
