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
    if (this.state.data.date) {
      console.log("dataaa" + this.state.data.date);
      var dd = new Date(this.state.data.date);
      var d = dd.toJSON().slice(0, 10);
      console.log();
    }
    return (
      <div>
        <h1> ho ho yamo yami </h1>

        <div className="container">
          <ul>
            <li>  {d}</li>
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
