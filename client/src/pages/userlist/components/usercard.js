import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import "./usercard.css";

class UserCard extends Component {
  // cnadidateview = () => {
  //   console.log(this.props);
  //   this.props.history.push("/getcandidate/" + this.props._id);
  // };

  render() {
    return (
      <div>
        <div className="card center bg-light mb-3 ">
          <div className="usercardbadgeDivforstate">
            <span className="badge badge-pill badge-warning">
              {this.props.state ? "disabled" : ""}
            </span>
          </div>

          <div className="usercardbadgeDiv">
            <span className="badge badge-pill badge-danger">
              {this.props.pendingcan}
            </span>
          </div>
          <div className="card-body">
            <h4 id="usercardtitle" className="card-title">
              {" "}
              <a href={"/user/" + this.props.id}> {this.props.name} </a>{" "}
            </h4>
          </div>
         
            <Avatar
              alt="Remy Sharp"
              src={this.props.avatar}
              style={{ margin: 10, width: 60, height: 60  }}
              //className={classes.avatar}
            />
     
        </div>
      </div>
    );
  }
}

export default UserCard;
