import React, { Component } from "react";
// import "./evaluation.css";
import jsonwebtoken from "jsonwebtoken";
import Navbar from "../../components/navbar";
import ShortlistCard from '../../components/shortlistCard'

const axios = require("axios");

class Shortlist extends Component {
  state = {
      candidateData:null

  };

  componentDidMount() {
    console.log("in shotlist");
    var jwt = localStorage.getItem("jwt");
    try {
      var dashboard = jsonwebtoken.verify(jwt,'authdemo');
      if (!dashboard) {
       // this.props.history.push("/login");
      }
    } catch (error) {
      this.props.history.push("/login");
      console.log(error);
    }

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var id = localStorage.getItem("userId");
    console.log("userid- " + id);

    axios
      .get("/usr/getshortlistdata/" + id, config)
      .then(res => {
          console.log(res.data)

          this.setState({candidateData:res.data})
      })
      .catch(err => {});

      setTimeout(()=>{
        console.log(this.state)
      },2000)
  }

  render() {
      var {candidateData} = this.state
    return (
      <div>
        <Navbar />
        Shortlist

        <div class="row">
            <div class="col-s4-m4-l4" id="cardcontainer1">
              { candidateData && candidateData.map(can => {
                //console.log(can.name+can.email+can.jobspec)
                return (
                  <ShortlistCard
                    status={can.shortlistStatus}
                    candidateName={can.candidateName}
                    
                    candidateId={can.candidateId}
                    allocatedUserName ={can.allocatedUserName}
                    allocatedDate = {can.allocatedDate}

                  />
                );
              })}
            </div>

        </div >
      </div>
    );
  }
}

export default Shortlist;
