import React, { Component } from "react";
const axios = require("axios");

class Avatar extends Component {
  state = {
    file: null,
    url: null,
    id: ""
  };

  chngehndl = e => {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files);
    this.setState({ id: this.props.match.params.id });
  };

  submitHndle = e => {
    e.preventDefault();
    console.log("hahah");
    console.log(this.props.match.params.id);

    const formdata = new FormData();
    formdata.append("avatar", this.state.file);
    //

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: jwt
      }
    };

    axios
      .post("/usr/avatar/" + this.state.id, formdata, config)
      .then(result => {
        console.log(result);
        this.setState({ url: result.data.url });
        //document.querySelector('.images').setAttribute('src',this.state.url)
      })
      .catch(err => {
        console.log('error - '+err)
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHndle}>
          <input type="file" name="avatar" onChange={this.chngehndl} />
          <input type="submit" value="submit" />
        </form>
        {console.log("alo - " + this.state.url)}
        {this.state.url && <img className="images" src={this.state.url} />}
      </div>
    );
  }
}

export default Avatar;
