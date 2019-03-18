import React, { Component } from "react";

const axios = require("axios");

class evaluation extends Component {
  state = {
    data: {
      name: "",
      jobspec: "",
      marks: ""
    },
    success_added_flag: false
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    console.log(id);
  }

  submithndler = () => {
    const id = this.props.match.params.id;

    axios
      .post("/evaluation/" + id, { data: this.state.data })
      .then(res => {
        this.setState({ success_added_flag: true });
      })
      .catch(err => {
        console.log(err)
      });
  };

  render() {
    return (
      <div>
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
              type="text"
              name="email"
              className="form-control"
              placeholder="enter candidate email"
              onChange={this.chngehandl}
              id="email"
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
          <input type="submit" className="btn btn-primary" value="add" />
        </form>
      </div>
    );
  }
}

export default evaluation;
