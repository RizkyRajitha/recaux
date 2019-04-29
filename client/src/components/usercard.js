import React, { Component } from "react";
import "./candidatecard.css";

class UserCard extends Component {
  // cnadidateview = () => {
  //   console.log(this.props);
  //   this.props.history.push("/getcandidate/" + this.props._id);
  // };

  render() {
    return (
      <div>
        <div id="cancard" class="card center bg-light mb-3 w-75">
          <h1 className="badge">
            <span class="badge badge-pill badge-danger">
              {this.props.pendingcan}
            </span>
          </h1>
          <div class="card-body">
            <h4 class="card-title">{this.props.name}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
