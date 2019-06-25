import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./candidatecard.css";
import moments from "moment";

class CandidateCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    chbox: true
  };

  cnadidateview = () => {
    console.log(this.props);
    this.props.history.push("/getcandidate/" + this.props._id);
  };

  sendid = () => {
    this.setState({ chbox: !this.state.chbox });

    console.log(this.state, this.props._id);

    this.props.triggershrt(this.props._id, this.state.chbox);
  };

  render() {
    if (this.props.date) {
      //console.log(this.props.date.slice(4, 24));
      // const dote = new Date(this.props.time)
      console.log(this.props.date);
      //Tue Apr 23 2019 12:21:53 GMT+0530 (+0530)
      var s = this.props.date; //.slice(4, 24); //"2019-04-24 18:00:00";  // from action.timeStamp

      var actionTime = moments(s, "YYYY-MM-DD HH:mm:ssZ");
      //var actionTime = moments(s, "MMM-DD-YYYY HH:mm:ssZ");
      var timeAgo = actionTime.fromNow();

      // console.log(timeAgo);
      //this.setState({timeAgo:timeAgo})
      console.log(
        "skilsssssssssssssssss - " + JSON.stringify(this.props.skills)
      );
      console.log("skilsssssss3333333ss - " + this.props.skills[2]);
      this.props.skills.map(ele => {
        console.log("pp" + ele);
      });
      // console.log("dataaa" + this.props.date);
      // var dd = new Date(this.props.date);
      // var d = dd.toJSON().slice(0, 10);
    }

    //   .toJSON()
    //   .slice(0, 10)
    //   .replace(/-/g, "/");

    return (
      <div>
        <div id="cancard" className="card bg-light  mt-5">
          <div className="addtoshortlist_container">
            <label class="containershbox">
              Add to Shortlist
              <input
                type="checkbox"
                onChange={this.sendid}
                disabled={!(this.props.shortlisterId === undefined)}
              />
              <span class="checkmark" />
            </label>
          </div>

          <div className="cancarddivtime">
            <h5>{timeAgo}</h5>
            {/* <h6>{d}</h6> */}
          </div>

          <div className="dashboardcancardbadgeDiv">
            <span className="badge badge-pill badge-danger">
              {this.props.status === "onhold" ? "Onhold" : ""}
              {this.props.status === "accepted" ? "Accepted" : ""}
              {this.props.status === "shortlisted" ? "Shortlisted" : ""}
              {this.props.status === "hr_interview" ? "HR interview" : ""}
              {this.props.status === "New" ? "New" : ""}
            </span>
          </div>
          <div class="card-body">
            <h4 class="card-title">{this.props.name}</h4>

            <table className="table table-borderless">
              <tbody className="cancardTable">
                <tr>
                  <th scope="row">job specification</th>
                  <td>{this.props.jobspec}</td>
                </tr>
                <tr>
                  <th scope="row">email</th>
                  <td>{this.props.email}</td>
                </tr>{" "}
                {this.props.assignToshortlisterbyName ? (
                  <tr>
                    <th scope="row">Assigned by</th>
                    <td>{this.props.assignToshortlisterbyName}</td>
                  </tr>
                ) : (
                  <tr>
                    <th scope="row">Not allocated </th>
                    <td />
                  </tr>
                )}
                {this.props.shortlisterName ? (
                  <tr>
                    <th scope="row">Allocated to shortlist to</th>
                    <td>{this.props.shortlisterName}</td>
                  </tr>
                ) : (
                  <tr>
                    <th scope="row">Not allocated </th>
                    <td />
                  </tr>
                )}
                {this.props.skills.length>0 && (
                  <tr>
                    <th scope="row">skills</th>
                    <td>{this.props.skills.map(ele => {return ele+" "})}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row" />
                  <td />
                </tr>
              </tbody>
            </table>

            <input
              type="button"
              value="view"
              className="btn btn-primary"
              onClick={this.cnadidateview}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CandidateCard);
