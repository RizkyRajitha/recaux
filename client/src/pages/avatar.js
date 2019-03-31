import React, { Component } from "react";
const axios = require("axios");

class Avatar extends Component {
  state = {
    file: null
  };

  chngehndl = e => {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files);
  };

  submitHndle = e => {
    e.preventDefault();
    console.log("hahah");

    const formdata = new FormData();
    formdata.append("avatar", this.state.file);
    var config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post("/usr/avatar", formdata, config)
      .then(result => {
        console.log("awoooo" + result);
      })
      .catch(err => {});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHndle}>
          <input type="file" name="avatar" onChange={this.chngehndl} />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Avatar;
