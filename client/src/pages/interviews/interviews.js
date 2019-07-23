import React, { Component } from "react";
import Interviewcard from "./components/interviewcard";
const jsonwebtoken = require("jsonwebtoken");
const axios = require("axios");

class Interview extends Component {
  state = {
    data: []
    // interviwerId:"",
    // interviwerName:'',
    // candidateId: '',
    // candidateName:'',
    // schedulerId: '',
    // schedulerName: '',
    // datetime:''
  };

  componentDidMount() {
    const usertype = localStorage.getItem("usertype");

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .get("/usr/interviews", config)
      .then(res => {
        console.log("interview data - - - ");

        //console.log(data.data)

        this.setState({ data: res.data });
        // this.setState({
        // schedulerName:data.data.schedulerName,
        // schedulerId:data.data.schedulerId,
        // candidateName:data.data.candidateName,
        // candidateId:data.data.candidateId,
        // interviwerName:data.data.interviwerName,
        // interviwerId:data.data.interviwerId,
        // datetime:data.data.datetime

        // })

        console.log(this.state.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div>
        <h1>interview List</h1>

        {/* <Interviewcard
          datetime="dsdsd"
          schedulerName="dsdsd"
          candidateName="sdssd"
          // interviwerName={element.interviwerName}
          // datetime={element.datetime}
        /> */}

        {this.state.data &&
          this.state.data.forEach(element => {
            console.log(element.schedulerName);
            return (
              <div>{element.schedulerName}</div>
              // <Interviewcard
              //   schedulerName={element.schedulerName}
              //   candidateName={element.candidateName}
              //   interviwerName={element.interviwerName}
              //   datetime={element.datetime}
              // />
            );
          })}
      </div>
    );
  }
}

export default Interview;
