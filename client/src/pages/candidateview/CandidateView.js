import React, { Component } from "react";
import axios from "axios";
import { threadId } from "worker_threads";

class CandidateView extends Component {
  state = {
    data: [],
    current_status:""
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.wtf();
  }

  evalHndler=()=>{
    this.props.history.push("/evaluation");
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
        <div className="container">
          <ul>
            <li> {d}</li>
            <li> name : {this.state.data.name}</li>
            <li> email : {this.state.data.email}</li>
            <li> job spec : {this.state.data.jobspec}</li>
          </ul>

          <div class="form-group">
            <label for="exampleFormControlSelect2">
              change candidate status
            </label>
            <select class="form-control" id="exampleFormControlSelect2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <button onClick={this.evalHndler}>evaluate</button>
        </div>
      </div>
    )
  }
}

export default CandidateView;
