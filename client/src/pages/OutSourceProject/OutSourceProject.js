import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./OutSourceProject.css";
import ChipsArraywodelete from "./components/skillChipsWithoutDeleye";
import jsonwebtoken from "jsonwebtoken";
const axios = require("axios");
const FileDownload = require("file-saver");

class OutSourceProject extends Component {
  state = {
    out_Name: "",
    out_Designation: "",
    out_ExeProfile: "",
    Skill: [],
    Company: "",
    DesignationP: "",
    Duration: "",
    Environment: "",
    TechnologiesP: "",
    out_Qualification: ""
  };

  onChangeOutName = e => {
    this.setState({
      out_Name: e.target.value
    });
  };

  onChangeOutDesignation = e => {
    this.setState({
      out_Designation: e.target.value
    });
  };

  onChangeOutExeProfile = e => {
    this.setState({
      out_ExeProfile: e.target.value
    });
  };

  onChangeOutQualification = e => {
    this.setState({
      out_Qualification: e.target.value
    });
  };

  componentDidMount() {
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    const id = this.props.match.params.id;
    console.log(id);

    axios
      .get("/usr/getcandidate/" + id, config)
      .then(res => {
        console.log("candatadtasdttatas");
        console.log(res.data);

        var skillssaa = [];

        res.data.candidateData.skills.forEach((element, index) => {
          skillssaa.push({ label: element.label, key: index });
        });

        this.setState({
          out_Name: res.data.candidateData.name,
          out_Designation: res.data.candidateData.jobspec,
          Skill: skillssaa
        });

        setTimeout(() => {
          console.log(this.state);
        }, 1000);
      })
      .catch(err => console.log(err));
  }

  submithandle = e => {
    e.preventDefault();
    console.log(" submitted ");
    console.log(this.state);

    console.log("mount");
    var jwt = localStorage.getItem("jwt");

    try {
      console.log("in register");
      var pay = jsonwebtoken.verify(jwt, "authdemo");
      // console.log("payload - " + pay);
      console.log("************************************");
    } catch (error) {
      console.log("not logged in redirecting...............");

      //e.preventDefault();
      this.props.history.push("/Login");
    }

    var config = {
      headers: { authorization: jwt },
      responseType: "blob"
    };

    var id = this.props.match.params.id;

    axios
      .post("/usr/outproject/" + id, this.state, config)
      .then(res => {
        console.log("awa res");
        console.log(res.data);

        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        //FileDownload(res.data, "evalpdf.pdf");
        FileDownload.saveAs(
          pdfBlob,
          this.state.out_Name + "_outprojectpdf.pdf"
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    let {
      out_Name,
      out_Designation,
      out_ExeProfile,
      Skill,
      projects
    } = this.state;
    return (
      <div className="container">
        <h1>
          <b>Auxenta Profile</b>
        </h1>
        <br />

        <div>
          <form onSubmit={this.submithandle} class="form-horizontal">
            <div className="form-group row">
              <label class="control-label">Name:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.out_Name}
                onChange={this.onChangeOutName}
              />
            </div>

            <div className="form-group row">
              <label>Designation:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.out_Designation}
                onChange={this.onChangeOutDesignation}
              />
            </div>

            <div className="form-group row">
              <label>Executive Profile:</label>
              <textarea
                className="form-control"
                // value={this.state.out_ExeProfile}
                onChange={this.onChangeOutExeProfile}
              />
            </div>

            <div className="form-group ">
              <label>Technologies:</label>
              <br />

              {this.state.Skill && (
                <ChipsArraywodelete currentskills={this.state.Skill} />
              )}
            </div>

            <div>
              <label htmlFor={"company"}>Company</label>
              <input
                type="text"
                name={"company"}
                className="form-control"
                onChange={e => this.setState({ Company: e.target.value })}
              />
              <label htmlFor={"desId"}>Designation</label>
              <input
                type="text"
                name={"desId"}
                className="form-control"
                onChange={e => this.setState({ DesignationP: e.target.value })}
              />

              <label htmlFor={"durId"}>Duration</label>
              <input
                type="text"
                name={"durId"}
                className="form-control"
                onChange={e => this.setState({ Duration: e.target.value })}
              />
              <label htmlFor={"envId"}>Project Environment</label>
              <input
                type="text"
                name={"envId"}
                className="form-control"
                onChange={e => this.setState({ Environment: e.target.value })}
              />

              <label htmlFor={"techId"}>Project Technologies</label>
              <input
                type="text"
                name={"techId"}
                className="form-control"
                onChange={e => this.setState({ TechnologiesP: e.target.value })}
              />
            </div>

            <div className="form-group row">
              <label>Qualifications:</label>
              <textarea
                className="form-control"
                // value={this.state.out_Qualification}
                onChange={this.onChangeOutQualification}
              />

              <input
                className="btn btn-primary formalbtn"
                type="submit"
                value="Genarate formal resume"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default OutSourceProject;
