import React, { Component } from "react";
import axios from "axios";

class fogotpassword extends Component {
  state = {
    email: "",
    errnotfound:false,
    succsee:false
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
          this.setState({errnotfound:true})
        }
        else{
          
          console.log('email send successfullly')
          this.setState({succsee:true})
     
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {

    if(this.state.errnotfound){
      return(
        <div>
          <h1> please check your email and try again </h1>
        </div>
      )
    }
    else if(this.state.succsee){
      return(
        <div> <h1> reset link set to your email </h1>
        </div>
      )
    }

    else{
      return (
        <div>
          <h1>we all forget and that's cool </h1>
          <br />
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
