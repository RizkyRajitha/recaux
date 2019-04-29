import React, { Component } from "react";
import axios from "axios";
import "./candidateview.css";
import jsonwebtoken from 'jsonwebtoken'
import Navbar from "../../components/navbar";
import {Alert} from 'reactstrap'
// import { Document } from 'react-pdf/dist/entry.webpack';

class CandidateView extends Component {
  state = {
    data: [],
    status: "",
    status_change: 0,
    file: null
  };



  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);

    const jwt = localStorage.getItem("jwt");
    console.log('jwt token -- - -- >>>'+jwt);

    try {
      console.log("in register");
      var pay = jsonwebtoken.verify(jwt, "authdemo");
      console.log('payload - '+pay);
      console.log('************************************' )

      
    } catch (error) {
      console.log("not logged in redirecting...............");

      //e.preventDefault();
      this.props.history.push("/Login");
    }

    this.wtf();
  }

  evalHndler = () => {
    const id = this.props.match.params.id;
    this.props.history.push("/evaluation/" + id);
  };

  chngehandlsel = e => {
    this.setState({ status_change: 0 });
    // this.setState({ status: e.target.value });
    console.log("status 1k malli" + e.target.value);
    var id = this.props.match.params.id;
    var payload = { status: e.target.value };
    axios
      .post("/usr/updatestatus/" + id, payload)
      .then(res => {
        console.log(res);
        this.setState({ status_change: 1 });
        console.log("awoooooooooo");
      })
      .catch(err => {
        console.log(err);
        this.setState({ status_change: 0 });
      });
  };

  addcv = e => {
    e.preventDefault();
    console.log("can cv clik");
    console.log(this.props.match.params.id);

    const formdata = new FormData();
    formdata.append("cv", this.state.file);
    //

    var config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post("/usr/cv/" + this.props.match.params.id, formdata, config)
      .then(result => {
        console.log("awoooo" + result);
      })
      .catch(err => {});
  };

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
        <Navbar />
        <div className="canview">
          <div className="canview2">
            {this.state.status_change === 1 && (
              <Alert color="primary" role="alert">
                status change succsessfuly
              </Alert>
            )}
            <ul className="list-group list-group-flush ">
              <li className="list-group-item"> date reciver : {d}</li>
              <li className="list-group-item">
                {" "}
                name : {this.state.data.name}
              </li>
              <li className="list-group-item">
                {" "}
                email : {this.state.data.email}
              </li>
              <li className="list-group-item">
                {" "}
                job spec : {this.state.data.jobspec}
              </li>
              <li className="list-group-item">
                {" "}
                current candidate status : {this.state.data.status}
              </li>
            </ul>
          </div>

          <div class="form-group">
            <label for="exampleFormControlSelect2">
              change candidate status
            </label>
            <select
              class="form-control"
              id="status"
              onChange={this.chngehandlsel}
            >
              <option selected>Select...</option>
              <option id="status" value="hr_interview">
                HR interview
              </option>
              <option id="status" value="onhold">
                onhold
              </option>
              <option id="status" value="accepted">
                accepted
              </option>
              <option id="status" value="shortlisted">
                shortlisted
              </option>
            </select>
          </div>
          <button onClick={this.evalHndler} className="btn btn-primary">
            evaluate
          </button>

          <br />
          <br />


          {/* <Document file='http://localhost:3001/static/cv/5ca0526e92b4ad35ec5a314d.pdf'/> */}
        </div>
      </div>
    );
  }
}

export default CandidateView;
