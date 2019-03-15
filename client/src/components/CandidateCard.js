import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import '../App.css'

class CandidateCard extends Component {
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

    //   .toJSON()
    //   .slice(0, 10)
    //   .replace(/-/g, "/");

    return (
      <div>
        <div class="card  bg-light mb-3 w-75">
          <div class="card-body">
            <h4 class="card-title">{this.props.name}</h4>
            <div >
            <h2 className='divecancard'> {d} </h2><br></br>
            </div>
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
