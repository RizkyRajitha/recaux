import React, { Component } from "react";
import "./shortlist.css";
import jsonwebtoken from "jsonwebtoken";
import Drawer from "../../components/sidenav";
import Navbar from "../../components/navbar";
import ShortlistCard from "../../components/shortlistCard";

const axios = require("axios");

class Shortlist extends Component {
  state = {
    candidateData: null,
    id: null,
    firstName: "",
    lastName: "",
    greet: "",
    usertype: "",
    avatarUrl: false,
  };

  componentDidMount() {
    console.log("in shotlist");
    var jwt = localStorage.getItem("jwt");
    try {
      var dashboard = jsonwebtoken.verify(jwt, "authdemo");
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
      .get("/usr/basicuserdetails", config)
      .then(res => {
        console.log(res.data);
        var datain = res.data;

        var preurl = res.data.avatarUrl.slice(0, 48);
            var posturl = res.data.avatarUrl.slice(
              49,
              res.data.avatarUrl.length
            );
            var config = "/w_290,h_295,c_thumb/";

            var baseUrl = preurl + config + posturl;
            this.setState({ avatarUrl: baseUrl });

        this.setState({
          id: datain._id,
          firstName: datain.firstName,
          lastName: datain.lastName,
          usertype: datain.usertype
         
        });
      })
      .catch(err => {});


    axios
      .get("/usr/getshortlistdata/" + id, config)
      .then(res => {
        console.log(res.data);

        if (res.data.length === 0) {
          this.setState({ candidateData: null });
        } else {
          this.setState({ candidateData: res.data });
        }

        console.log("arr length - " + JSON.stringify(res.data));
      })
      .catch(err => {});

    setTimeout(() => {
      console.log(this.state);
    }, 2000);
  }

  render() {
    var { candidateData } = this.state;
    return (
      <div>
       {/* <Navbar />
        <Drawer
          avatarUrl={this.state.avatarUrl}
          username={this.state.firstName + " " + this.state.lastName}
          type={this.state.usertype}
        /> */}

        {!this.state.candidateData && (
          <div className="shortlistnopendingcanididatesdiv">
            you have no pending candidates
          </div>
        )}
        <div class="row">
          <div class="col-s4-m4-l4" id="shortlistcardcontainer1">
            {candidateData &&
              candidateData.map(can => {
                //console.log(can.name+can.email+can.jobspec)

                /**
                 * allocatedDate: "2019-06-04T17:59:11.707Z"
assignToshortlisterbyId: "5cebf5fdfbc6b841e4e2f931"
assignToshortlisterbyName: "dileep sapumal"
cvUrl: null
date: "2019-06-04T17:58:21.670Z"
email: "edward@snowden.com"
jobspec: "cyber security "
name: "Edward snowden "
shortlister: "5cf003c50180b279708f26d6"
shortlisterName: "angela jayathissa"
source: "manual"
status: "New"
                 */

                return (
                  <ShortlistCard
                    status={can.status}
                    candidateName={can.name}
                    candidateJobspec={can.jobspec}
                    candidateId={can._id}
                    allocatedUserName={can.assignToshortlisterbyName}
                    allocatedDate={can.allocatedDate}
                    email={can.email}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Shortlist;
