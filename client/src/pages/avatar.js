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
    console.log(this.props.match.params.id)

    const formdata = new FormData();
    formdata.append("avatar", this.state.file);
    //

    var config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post("/usr/avatar/"+this.props.match.params.id, formdata, config)
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
        <img src='http://localhost:3001/static/avatar/5ca04e530593d404f8d61d63.png'/>
      </div>
    );
  }
}

export default Avatar;
