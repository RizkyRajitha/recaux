import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Shortlistcard.css";
import moments from "moment";

class ShortlistCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    chbox: true
  };

  componentDidMount() {
    console.log("in shortloist card");
    console.log("props - " + JSON.stringify(this.props));
  }

  cnadidateview = () => {
    console.log(this.props);
    console.log("prop can id - "+this.props.candidateId)
    this.props.history.push("/getcandidate/" + this.props.candidateId);
  };

  sendid = () => {
    this.setState({ chbox: !this.state.chbox });

    console.log(this.state);

    this.props.triggershrt(this.props._id, this.state.chbox);
  };

  render() {
    if (this.props.allocatedDate) {


 console.log(this.props.allocatedDate.slice(4, 24));
       const dote = new Date(this.props.time)
      console.log(this.props.date);
      //Tue Apr 23 2019 12:21:53 GMT+0530 (+0530)
      var s =this.props.allocatedDate//.slice(4, 24)
      //var s = this.props.date; //.slice(4, 24); //"2019-04-24 18:00:00";  // from action.timeStamp

      var actionTime = moments(s, "YYYY-MM-DD HH:mm:ssZ");
      //var actionTime = moments(s, "MMM-DD-YYYY HH:mm:ssZ");
      var timeAgo = actionTime.fromNow();

       console.log(" p p pp = "+timeAgo);
      //this.setState({timeAgo:timeAgo})

      console.log("dataaa" + this.props.allocatedDate);
      var dd = new Date(this.props.allocatedDate);
      var d = dd.toJSON().slice(0, 10);
      console.log();
    }

  

    return (
      <div id="cancard" className="card bg-light  mt-5">
        <div className="cancarddivtime"><h5> allocated -  {timeAgo}</h5></div>

        <div className="cancardbadgeDiv">
          <span class="badge badge-pill badge-danger">{this.props.status}</span>
        </div>
        <div class="card-body">
          <h4 class="card-title">{this.props.candidateName}</h4>

          <table className="table table-borderless">
            <tbody className="cancardTable">
              <tr>
                <th scope="row">job specification</th>
                <td>{this.props.candidateJobspec}</td>
              </tr>
              <tr>
                <th scope="row">email</th>
                <td>{this.props.email}</td>
              </tr>{" "}
              {this.props.allocatedUserName ? (
                <tr>
                  <th scope="row">Assigned by</th>
                  <td>{this.props.allocatedUserName}</td>
                </tr>
              ) : (
                <tr>
                  <th scope="row">Not allocated </th>
                  <td />
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
    );
  }
}

export default withRouter(ShortlistCard);
