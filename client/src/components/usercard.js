import React, { Component } from "react";
import "./usercard.css";

class UserCard extends Component {
  // cnadidateview = () => {
  //   console.log(this.props);
  //   this.props.history.push("/getcandidate/" + this.props._id);
  // };

  render() {
    return (
      <div>
        <div id="cancard" className="card center bg-light mb-3 w-75">
          <div className="usercardbadgeDiv">
            <span className="badge badge-pill badge-danger">
              {this.props.pendingcan}
            </span>
          </div>
          <div className="card-body">
            <h4 id="usercardtitle" className="card-title"> <a href={"/user/"+this.props.id} > {this.props.name} </a> </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
