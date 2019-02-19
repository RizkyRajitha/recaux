import React, { Component } from "react";
import axios from "axios";

class fogotpassword extends Component {



    state={
        email:""
    }
    changeHandler = e => {
        this.setState({
          [e.target.id]: e.target.value
        });
      };
    


    
btn1handler = (e)=>{
    e.preventDefault();
console.log('inform')

    axios
      .post(
        "http://localhost:3001/usr/fogotpassword",
        { email: this.state.email}
       
      ).then(res=>{
        console.log(res.data)

        

      }).catch(err=>{
        console.log(err)
      })
}


  render() {
    return (
      <div>
        <h1>we all forget and thats cool </h1>
        <br />
        <h1> just enter your registered email</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm" />
            <div className="col-sm">
              <form onSubmit={this.btn1handler}>
                <div className="form-group">
                  <input
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

export default fogotpassword;
