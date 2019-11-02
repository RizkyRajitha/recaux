import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CandidateCard from "../../components/CandidateCard";
import UserCard from "../../components/usercard";
import "./dashboard.css";
import Navbar from "../../components/navbar";
import axios from "axios";
import Modal from "react-modal";
import Select from "react-select";
import Drawer from "../../components/sidenav";
import Button from "@material-ui/core/Button";

const jsonwebtoken = require("jsonwebtoken");

//import { CandidateCard } from "./CandidateCard";
// const request = require("request");

const customStyles = {
  content: {
    width: "50%",
    height: "40%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement("#root");

class dashboard extends Component {
  state = {
    logedin: true,
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    greet: "",
    usertype: "",
    avatarUrl: false,
    selectedOption: null,
    selectoptionsnamelist: [],
    emailverified: false,
    candidatedata: [],
    userdata: [],
    numofshort: 0,
    shorlist: [],
    shortlistbythisuser: [],
    shortedcanarrnamelist: [],
    shrtlistSuccess: false,
    isLoading: false,
    scheduledcandicates: [],
    shortlistedcandicates: [],
    newcandicates: []
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  changeHandlercontent = e => {
    this.setState({ content: e.target.value });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  greet = () => {
    var now = new Date();
    var hour = now.getHours();
    console.log(hour);
    if (hour > 18 && hour < 23) {
      this.setState({ greet: "Good night" });
    } else if (hour > 16 && hour < 18) {
      this.setState({ greet: "Good evening" });
    } else if (hour > 12 && hour < 16) {
      this.setState({ greet: "Good afternoon" });
    } else {
      this.setState({ greet: "Good morning" });
    }
  };

  getcandidatedata = () => {
    console.log("in candidate  data");
    axios
      .get("/usr/getcandidate")
      .then(data => {
        console.log("candidate data - - - " + data.data);
        this.setState({
          candidatedata: data.data.candidateData,
          selectoptionsnamelist: data.data.userData,
          scheduledcandicates: data.data.scheduledcandicates,
          shortlistedcandicates: data.data.shortlistedcandicates,
          newcandicates: data.data.newcandicates
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  shortlistmodal = () => {
    this.openModal();

    var canarr = this.state.candidatedata;
    var shortedcanarr = this.state.shortlistbythisuser;
    var shortedcanarrnamelist = [];
    var userlist = [];
    var userdetails = this.state.userdata;

    console.log("can arr" + JSON.stringify(canarr));
    console.log("shotlisted ids" + shortedcanarr);

    canarr.forEach(element => {
      if (shortedcanarr.indexOf(element._id) !== -1) {
        shortedcanarrnamelist.push(element.name);
      }
    });
    this.setState({ shortedcanarrnamelist: shortedcanarrnamelist });

    console.log(shortedcanarrnamelist);

    // var opt = [];
    // userdetails.forEach(ele => {
    //   var displayname = `${ele.firstName} ${ele.lastName}`;

    //   opt.push({ value: ele._id, label: displayname });
    // });

    //this.setState({ selectoptionsnamelist: opt });

    //console.log(opt);
  };

  handleChangemodalselect = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  shortlisting = (id, bxstate) => {
    if (bxstate) {
      this.setState({ numofshort: this.state.numofshort + 1 });

      this.setState({
        shortlistbythisuser: [...this.state.shortlistbythisuser, id]
      });

      // var temp_arr = this.state.shortlistbythisuser;
      // console.log("shrtl is - " + this.state.shortlistbythisuser);

      // temp_arr.push(id);

      // this.setState({
      //   shortlistbythisuser: temp_arr
      // });

      console.log("temp arr - " + this.state.shortlistbythisuser);
    } else {
      this.setState({ numofshort: this.state.numofshort - 1 });
      var arr = this.state.shortlistbythisuser;
      var key = arr.indexOf(id);
      console.log(key);
      if (key !== -1) {
        arr.splice(key, 1);
        this.setState({ shortlistbythisuser: arr });
      }
    }
    setTimeout(() => {
      console.log(
        "clicked from card id -  " +
          id +
          " bx state - " +
          bxstate +
          " num of resumes - " +
          this.state.numofshort +
          " resumeids - " +
          JSON.stringify(this.state.shortlistbythisuser)
      );
    }, 1000);
  };

  shorlisthandler = () => {
    this.setState({ isLoading: true });

    console.log(
      "on the way + " +
        JSON.stringify(this.state.selectedOption) +
        " candidates -  " +
        this.state.shortlistbythisuser
    );

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var payload = {
      allocateduser: this.state.selectedOption.value,
      candidatesallocated: this.state.shortlistbythisuser
    };

    console.log("payload" + JSON.stringify(payload));

    axios
      .post("/usr/shortlistMany/" + this.state.id, payload, config)
      .then(res => {
        console.log(res);
        this.closeModal();
        this.setState({ isLoading: false });
        window.location.reload(false);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  getuserdata = () => {
    // this.setState({ isLoading: true });
    console.log("in user data");
    console.log("usr type" + this.state.usertype);
    console.log(this.state);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    if (this.state.usertype === "admin") {
      axios
        .get("/usr/userdata", config)
        .then(data => {
          console.log("user data - - - " + data.data);
          this.setState({ userdata: data.data });
          console.log(this.state);
          this.setState({ isLoading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
  };

  componentDidMount() {
    //this.greet();
    console.log("mount");
    var jwt = localStorage.getItem("jwt");
    this.setState({ isLoading: true });
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
      headers: { authorization: jwt }
    };

    axios
      .get("/usr/dashboard", config)
      .then(result => {
        console.log("sucsess" + result.data);
        this.setState({ isLoading: false });
        if (result.data) {
          console.log("menna apu data");
          console.log(result.data);

          this.setState({
            email: result.data.email,
            emailverified: result.data.emailverified,
            id: result.data.id,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            usertype: result.data.usertype,
            shorlist: result.data.shortList
          });

          this.setState({ logedin: true });

          localStorage.setItem("usertype", result.data.usertype);

          if (result.data.avatarUrl) {
            var preurl = result.data.avatarUrl.slice(0, 48);
            var posturl = result.data.avatarUrl.slice(
              49,
              result.data.avatarUrl.length
            );
            var config = "/w_290,h_295,c_thumb/";

            var baseUrl = preurl + config + posturl;
            this.setState({ avatarUrl: baseUrl });
          }

          //console.log(this.state);
          this.getcandidatedata();
          this.getuserdata();

          localStorage.setItem("userId", result.data.id);
        } else {
          this.setState({ logedin: false });
        }
      })
      .catch(err => {
        this.setState({ logedin: false });
        console.log("error" + err);
      });

    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  }

  render() {
    var cndetailes = this.state.candidatedata;
    var usrdetails = this.state.userdata.slice(0, 5);
    const { selectedOption, selectoptionsnamelist } = this.state;
    return (
      <div className="dashboardmain">
        <div class="loader-dashboard" hidden={!this.state.isLoading} />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>confirm list</h2>

          <div class="input-field col s12">
            <p>{this.state.shortedcanarrnamelist}</p>

            <Select
              required
              value={selectedOption}
              onChange={this.handleChangemodalselect}
              options={selectoptionsnamelist}
            />
          </div>

          <div className="submit">
            <input
              type="submit"
              className="btn btn-outline-danger"
              onClick={this.shorlisthandler}
              value="confirm shortlisting"
              id="submit"
            />
          </div>
        </Modal>

        <div class="row">
          <div className="col-s4-m4-l4" id="dashboardcardcontainer1">
            {this.state.newcandicates.length !== 0 && (
              <h5 className="noschedulecanh6"> New candidates </h5>
            )}
            {this.state.newcandicates.length === 0 && (
              <h5 className="noschedulecanh6"> no new candidates </h5>
            )}
            {this.state.newcandicates.map(can => {
              //console.log(can.name+can.email+can.jobspec)
              return (
                <CandidateCard
                  triggershrt={this.shortlisting}
                  name={can.name}
                  email={can.email}
                  jobspec={can.jobspec}
                  _id={can._id}
                  date={can.date}
                  status={can.primaryStatus}
                  shortlisterId={can.shortlister}
                  shortlisterName={can.shortlisterName}
                  assignToshortlisterbyId={can.assignToshortlisterbyId}
                  assignToshortlisterbyName={can.assignToshortlisterbyName}
                  skills={can.skills}
                />
              );
            })}
          </div>{" "}
          <div className="col-s4-m4-l4" id="dashboardcardcontainer2">
            {this.state.shortlistedcandicates.length !== 0 && (
              <h5 className="noschedulecanh6"> Shortlisted Candidates </h5>
            )}{" "}
            {this.state.shortlistedcandicates.length === 0 && (
              <h5 className="noschedulecanh6"> No Shortlisted Candidates </h5>
            )}
            {this.state.shortlistedcandicates.map(can => {
              //console.log(can.name+can.email+can.jobspec)
              return (
                <CandidateCard
                  triggershrt={this.shortlisting}
                  name={can.name}
                  email={can.email}
                  jobspec={can.jobspec}
                  _id={can._id}
                  date={can.date}
                  status={can.primaryStatus}
                  shortlisterId={can.shortlister}
                  shortlisterName={can.shortlisterName}
                  assignToshortlisterbyId={can.assignToshortlisterbyId}
                  assignToshortlisterbyName={can.assignToshortlisterbyName}
                  skills={can.skills}
                  disableshortcheck={true}
                />
              );
            })}
          </div>{" "}
          <div className="col-s4-m4-l4" id="dashboardcardcontainer3">
            {this.state.scheduledcandicates.length !== 0 && (
              <h5 className="noschedulecanh6">Scheduled candidates</h5>
            )}

            {this.state.scheduledcandicates.length === 0 && (
              <h5 className="noschedulecanh6">No scheduled candidates</h5>
            )}
            {this.state.scheduledcandicates.map(can => {
              //console.log(can.name+can.email+can.jobspec)
              return (
                <CandidateCard
                  triggershrt={this.shortlisting}
                  name={can.name}
                  email={can.email}
                  jobspec={can.jobspec}
                  _id={can._id}
                  date={can.date}
                  status={can.status}
                  shortlisterId={can.shortlister}
                  shortlisterName={can.shortlisterName}
                  assignToshortlisterbyId={can.assignToshortlisterbyId}
                  assignToshortlisterbyName={can.assignToshortlisterbyName}
                  skills={can.skills}
                  disableshortcheck={true}
                />
              );
            })}
          </div>
        </div>

        <br />
        <br />
      </div>
    );
  }
}

export default dashboard;
