import React, { Component } from "react";
import axios from "axios";
const jwt = require("jsonwebtoken");
// Set Up The Initial Context
// const profileContext = React.createContext()
// Create an exportable consumer that can be injected into components
// export const profileConsumer = profileContext.Consumer
// Create the provider using a traditional React.Component class
//const profileContext = { ggg: "lllll" };

var profileDetails = { ggg: "lllll" };

//console.log("jwt token -- - - -- >>>" + jwt);
export const profileContext = React.createContext();

class profileClass extends Component {
  state = {"ss":"ssssss"};

  componentDidMount() {

    console.log("in providers-s-s-s")

    const token = localStorage.getItem("jwt")

    var config = {
      headers: { authorization: token }
    }

    axios
      .get("/usr/basicuserdetails", config)
      .then(res => {
        console.log(res.data);
        var datain = res.data;

        var preurl = res.data.avatarUrl.slice(0, 48);
        var posturl = res.data.avatarUrl.slice(49, res.data.avatarUrl.length);
        var config = "/w_290,h_295,c_thumb/";

        var baseUrl = preurl + config + posturl;

        profileDetails = {
          id: datain._id,
          firstName: datain.firstName,
          lastName: datain.lastName,
          usertype: datain.usertype,
          avatarUrl: baseUrl
        };
      })
      .catch(err => {});
  }

  render() {
   return(
    <profileContext.Provider value={this.state}>
    {this.props.children}
  </profileContext.Provider>
   )
  }
}

//profileContext

// class profileProvider extends Component {

//   render () {
//     return (
//       // value prop is where we define what values
//       // that are accessible to consumer components
//        <profileContext.Provider value={this.state}>
//         {this.props.children}
//       </profileContext.Provider>
//     )
//   }
// }
