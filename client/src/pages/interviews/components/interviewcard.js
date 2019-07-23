import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
//import "./usercard.css";

class Interviewcard extends Component {
  // cnadidateview = () => {
  //   console.log(this.props);
  //   this.props.history.push("/getcandidate/" + this.props._id);
  // };

  render() {
    return (
      <div>
        <div id="cancard" className="card center bg-light mb-3 w-75">
          <div className="card-body">
            {console.log("yolo")}
            {console.log(this.props)}

          </div>
        </div>
      </div>
    );
  }
}

export default Interviewcard;



            {
              /* <h1> {this.props.schedulerName} </h1>
            <h1>{this.props.candidateName}</h1> */
            }
            {
              /* {this.props.interviwerName}
            {this.props.schedulerName}
            {this.props.datetime} */
            }
