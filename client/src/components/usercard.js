import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./candidatecard.css";

class UserCard extends Component {
  cnadidateview = () => {
    console.log(this.props);
    this.props.history.push("/getcandidate/" + this.props._id);
  };

  render() {
    if (this.props.date) {
      console.log("dataaa" + this.props.date);
      var dd = new Date(this.props.date);
      var d = dd.toJSON().slice(0, 10);
      console.log();
    }

    return (
      <div>
        <div id='cancard' class="card center bg-light mb-3 w-75">

      <input id='checkbox' type='checkbox'>

      </input>

        <h1 className="badge">
              <span class="badge badge-pill badge-danger">{this.props.status}</span>
            </h1>
          <div class="card-body">
            
            <h4 class="card-title">{this.props.name}</h4>
            <div>
              <h3 className="divecancard" > {d} </h3>
              <br />
            </div>
            <p class="card-text">


              <ul className="list-group" >
                <li  className="list-group-item active" >job spechification :{this.props.jobspec}</li>
                <li  className="list-group-item" >email :{this.props.email} </li>
              </ul>
            </p>
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

export default withRouter(UserCard);
