import React, { Component } from "react";
import Navbar from "../../components/navbar";
import "./addcandidate.css";
import FixRequiredSelect from "./fixreqselect";
import BaseSelect from "react-select";
const jwt = require("jsonwebtoken");
const axios = require("axios");

const Select = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={props.options}
    value={props.value}
    onChange={props.onChange}
  />
);

class Addcandidate extends Component {
  state = {
    name: "",
    email: "",
    login: false,
    addedsucsess: 0,
    expat: new Date(),
    nullfielderr: false,
    cvFile: null,
    errfiletoolarge: false,
    unsupportedFormat: false,
    duplicateemailerr: false,
    dupcanid: null,
    errchoseefilelater: false,
    isLoading: false,
    resumeupoadsuccsess: false,
    jobspeclist: [],
    jobspec: "",
    username: ""
  };
  chngehandl = e => {
    //console.log(e.target.name,)
    this.setState({ [e.target.name]: e.target.value });

    //console.log(this.state);
  };

  componentDidMount() {
    //this.setState({nullfielderr:false})
    var token = localStorage.getItem("jwt");
    try {
      var data = jwt.verify(token, "authdemo");
      console.log(data);
      if (data) {
        this.setState({ login: true });
      }
    } catch (error) {
      console.log(error);
      if (error) {
        this.setState({ expat: error.expiredAt });
        this.setState({ login: false });

        //console.log(error.expiredAt.getHour())//+"  "+error.expiredAt.getMinutes())
      }
    }
    var config = {
      headers: { authorization: token }
    };

    axios
      .get("/usr/getjobspeclist", config)
      .then(res => {
        console.log(res.data.jobspeclist);
        this.setState({ jobspeclist: res.data.jobspeclist });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("/usr/basicuserdetails", config)
      .then(res => {
        console.log(res.data);
        var datain = res.data;
        this.setState({ username: datain.firstName + " " + datain.lastName });
      })
      .catch(err => {
        console.log(err);
      });
  }

  chngehndlcv = e => {
    this.setState({ cvFile: e.target.files[0] });
    console.log(e.target.files);
  };

  viewdupcanprofile = e => {
    this.props.history.push("/getcandidate/" + this.state.dupcanid);
  };

  jobspechchange = jobspec => {
    this.setState({ jobspec: jobspec });
    console.log(`Option selected:`, jobspec);
  };

  btn1handler = e => {
    //this.setState({ cvFile: e.target.files[0] });
    console.log("is file available " + this.state.cvFile);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    this.setState({
      addedsucsess: 0,
      errfiletoolarge: false,
      unsupportedFormat: false,
      duplicateemailerr: false
    });
    e.preventDefault();
    var can = this.state;
    console.log("state -  " + can);

    console.log("submited");
    var params = new URLSearchParams();
    params.append("candidatename", this.state.name);
    params.append("candidateemail", this.state.email);
    params.append("candidatejobspec", this.state.jobspec.label);
    this.setState({ addedsucsess: false });
    this.setState({ isLoading: true });
    axios
      .post("/usr/addcandidate", params, config)
      .then(data => {
        console.log(data.data);

        var addeduserid = data.data._id;
        if (this.state.cvFile === null) {
          this.setState({ errchoseefilelater: true });
        }
        if (this.state.cvFile) {
          this.setState({ isLoading: true });
          console.log("uploading cv inticiated");
          const formdata = new FormData();
          formdata.append("cv", this.state.cvFile);

          console.log(formdata);
          //

          var jwt = localStorage.getItem("jwt");

          var config = {
            headers: {
              "content-type": "multipart/form-data",
              authorization: jwt
            }
          };
          axios
            .post(
              "/usr/cv/" +
                addeduserid +
                "/" +
                this.state.username +
                "/" +
                this.state.jobspec.label,
              formdata,
              config
            )
            .then(result => {
              console.log("awoooo" + result);
              console.log("awoooo" + JSON.stringify(result));

              document.getElementById("addcanname").value = "";
              document.getElementById("addcanemail").value = "";
              this.setState({
                cvFile: null,
                addedsucsess: 2,
                name: "",
                jobspec: "",
                email: "",
                isLoading: false,
                cvUrl: result.data.url,
                resumeupoadsuccsess: true
              });
            })
            .catch(
              function(error) {
                console.log(error.response.data);
                this.setState({ isLoading: false });
                if ("file_too_large" === error.response.data) {
                  this.setState({ errfiletoolarge: true });
                }

                if ("unsupported_file_format" === error.response.data) {
                  this.setState({ unsupportedFormat: true });
                }
              }.bind(this)
            );
        }
      })
      .catch(err => {
        if (err.response.data.errcode == 11000) {
          console.log(err.response.data);
          this.setState({
            isLoading: false,
            duplicateemailerr: true,
            dupcanid: err.response.data.dupcanid
          });
        }

        console.log(err);
      });

    // document.querySelector("#name").value = "";
    // document.querySelector("#email").value = "";
    // document.querySelector("#job").value = "";
    // this.setState({ nullfielderr: false });
  };

  clear = () => {
    this.setState({
      name: "",
      email: "",

      addedsucsess: 0,

      cvFile: null,
      errfiletoolarge: false,
      unsupportedFormat: false,
      duplicateemailerr: false,
      dupcanid: null,

      isLoading: false,
      resumeupoadsuccsess: false,

      jobspec: ""
    });
  };

  render() {
    if (this.state.login) {
      return (
        <div>
          {/* <Navbar /> */}
          <div className="container">
            <div className="row">
              <div className="col-sm" />
              <div className="col-6">
                {this.state.addedsucsess == 2 && (
                  <div class="alert alert-success" role="alert">
                    candidate added successfully
                  </div>
                )}
                {this.state.nullfielderr && (
                  <div class="alert alert-danger" role="alert">
                    please fill the form
                  </div>
                )}

                <div
                  class="loader-addcandidate"
                  hidden={!this.state.isLoading}
                />

                {this.state.duplicateemailerr && (
                  <div class="alert alert-danger" role="alert">
                    This candidate is already in the system
                    <button
                      onClick={this.viewdupcanprofile}
                      className="btn btn-outline-danger"
                      id="userprofile"
                    >
                      view
                    </button>
                  </div>
                )}

                {this.state.resumeupoadsuccsess && (
                  <div class="alert alert-success" role="alert">
                    resume uploaded successfully
                  </div>
                )}

                {this.state.addedsucsess == 1 && (
                  <div class="alert alert-danger" role="alert">
                    error occured connecting to the server
                  </div>
                )}

                {this.state.errfiletoolarge && (
                  <div class="alert alert-danger" role="alert">
                    File too large, select another file
                  </div>
                )}
                {this.state.unsupportedFormat && (
                  <div class="alert alert-danger" role="alert">
                    Unsupported File, select another file
                  </div>
                )}

                <form onSubmit={this.btn1handler}>
                  <br />
                  <br />
                  <br />
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      name="name"
                      value={this.state.name}
                      className="form-control"
                      onChange={this.chngehandl}
                      placeholder="enter candidate name"
                      id="addcanname"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="email"
                      name="email"
                      value={this.state.email}
                      className="form-control"
                      placeholder="enter candidate email"
                      onChange={this.chngehandl}
                      id="addcanemail"
                    />
                  </div>
                  <div className="form-group">
                    <label> </label>

                    <Select
                      isSearchable
                      required
                      value={this.state.jobspec}
                      onChange={this.jobspechchange}
                      options={this.state.jobspeclist}
                    />

                    {/* <input
                      required
                      type="text"
                      name="jobspec"
                      className="form-control"
                      placeholder="enter candidate job spec"
                      onChange={this.chngehandl}
                      id="job"
                    /> */}
                  </div>
                  <div class="input-group mb-3">
                    <div class="custom-file">
                      <input
                        class="custom-file-input"
                        id="inputGroupFile01"
                        required
                        type="file"
                        name="cv"
                        // value={this.state.cvFile}
                        onChange={this.chngehndlcv}
                      />
                      <label class="custom-file-label" for="inputGroupFile01">
                        {this.state.cvFile
                          ? this.state.cvFile.name +
                            " " +
                            (this.state.cvFile.size / 1024 / 1024).toFixed(2) +
                            "Mb"
                          : "Choose file"}
                      </label>
                    </div>
                  </div>
                  {/* <input
                    required
                    type="file"
                    name="cv"
                    onChange={this.chngehndlcv}
                  /> */}
                  {this.state.errchoseefilelater && (
                    <div class="alert alert-danger" role="alert">
                      you can add a resume later using candidate profile
                    </div>
                  )}
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="add"
                  />
                  <a
                    className="btn addcanclear btn-outline-primary"
                    onClick={this.clear}
                    value="add"
                  >
                    Clear
                  </a>
                </form>

                <br />
              </div>
              <div className="col-sm" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>
            Session expired at {this.state.expat.toString()}please login to
            continue
          </h3>
        </div>
      );
    }
  }
}

export default Addcandidate;

/***
 * 
 * 
 *   this.setState({ cvFile: e.target.files[0] });
    console.log(e.target.files);
    this.setState({ id: this.props.match.params.id });
    this.setState({ isLoading: true });

    this.setState({ cvNotFOundErr: false });

    console.log(this.state.data);
    console.log(this.state.data.cvUrl);

    console.log("hahah");
    console.log(this.props.match.params.id);

    const formdata = new FormData();
    formdata.append("cv", e.target.files[0]);
    //
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: jwt
      }
    };

    axios
      .post("/usr/cv/" + this.props.match.params.id, formdata, config)
      .then(result => {
        console.log("awoooo" + JSON.stringify(result));
        this.setState({ cvUrl: result.data.url });
        this.setState({ isLoading: false });
      })
      .catch(
        function(error) {
          console.log(error.response.data);
          this.setState({ isLoading: false });
          if ("file_too_large" === error.response.data) {
            this.setState({ errfiletoolarge: true });
          }

          if ("unsupported_file_format" === error.response.data) {
            this.setState({ unsupportedFormat: true });
          }
        }.bind(this)
      );
 */
