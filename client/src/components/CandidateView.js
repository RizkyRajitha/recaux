import React, { Component } from "react";
import axios from "axios";

class CandidateView extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.wtf();
  }
  wtf = () => {
    const id = this.props.match.params.id;
    axios
      .get("/usr/getcandidate/" + id)
      .then(res => {
        this.setState({ data: res.data });
        console.log(res);
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1> ho ho yamo yami </h1>

        <div className="container">
          <ul>
            <li> name : {this.state.data.name}</li>
            <li> email : {this.state.data.email}</li>
            <li> job spec : {this.state.data.jobspec}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default CandidateView;
