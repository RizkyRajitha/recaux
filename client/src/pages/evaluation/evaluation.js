import React, { Component } from "react";
import "./evaluation.css";

const axios = require("axios");

class evaluation extends Component {
  state = {
    name: "",
    jobspec: "",
    marks: null,
    status: "",
    success_added_flag: false
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    console.log(id);
  }

  submithndler = () => {
    const id = this.props.match.params.id;

    var payload={
      name:this.state.name,
      jobspec:this.state.jobspec,
      marks:this.state.marks,
      status:this.state.status
    }

    console.log(payload)

    axios
      .post("/evaluation/" + id, { data: payload })
      .then(res => {
        console.log(res)
        this.setState({ success_added_flag: true });
      })
      .catch(err => {
        console.log(err);
      });

      this.props.history.push('/getcandidate/'+id)
  };
  chngehandl = e => {
    //console.log(e.target.name,)
    this.setState({ [e.target.name]: e.target.value });

    console.log(this.state);
  };

  chngehandlsel = e=>{
    this.setState({ status: e.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <div className="eval">
        <form onSubmit={this.submithndler}>
          <br />
          <br />
          <br />
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={this.chngehandl}
              placeholder="enter candidate name"
              id="name"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="marks"
              className="form-control"
              placeholder="enter candidate marks"
              onChange={this.chngehandl}
              id="marks"
            />
          </div>
          <div className="form-group">
            <label> </label>
            <input
              type="text"
              name="jobspec"
              className="form-control"
              placeholder="enter candidate job spec"
              onChange={this.chngehandl}
              id="job"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect2">
              change candidate status
            </label>
            <select class="form-control" id="status" onChange={this.chngehandlsel}>
              <option id='status'>1</option>
              <option id='status'>2</option>
              <option id='status'>3</option>
              <option id='status'>4</option>
              <option id='status'>5</option>
            </select>
          </div>
          <input type="submit" className="btn btn-primary" value="add" />
        </form>
      </div>
    );
  }
}

export default evaluation;
