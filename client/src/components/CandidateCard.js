import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CandidateCard extends Component {
  cnadidateview = () => {
    console.log(this.props);
    this.props.history.push("/getcandidate/" + this.props._id)
  };

  render() {
    return (
      <div>
        <div class="card  bg-light mb-3 w-75">
          <div class="card-body">
            <h4 class="card-title">{this.props.name}</h4>
            <p class="card-text">
              <ul>
                <li>job spechification :{this.props.jobspec}</li>
                <li>email :{this.props.email} </li>
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

export default withRouter(CandidateCard);
