import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CandidateCard from "../../components/CandidateCard";
import UserCard from "../../components/usercard";
import "./dashboard.css";
import Navbar from "../../components/navbar";
import axios from "axios";
import Modal from "react-modal";
import Select from "react-select";

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
    selectedOption: null,
    selectoptionsnamelist: [],
    emailverified: false,
    candidatedata: [],
    userdata: [],
    numofshort: 0,
    shorlist: [],
    shortedcanarrnamelist: [],
    shrtlistSuccess: false
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

  verifyemail = () => {
    //this.props.history.push('/fogotpassword')
    axios
      .post("/usr/sendconfirmemail/" + this.state.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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

  reg = e => {
    e.preventDefault();
    this.props.history.push("/register");
  };

  usrprofile = e => {
    e.preventDefault();
    this.props.history.push("/user/" + this.state.id);
  };

  addcandidate = e => {
    e.preventDefault();
    this.props.history.push("/addcandidate");
  };

  getcandidatedata = () => {
    console.log("in candidate  data");
    axios
      .get("/usr/getcandidate")
      .then(data => {
        console.log("candidate data - - - " + data.data);
        this.setState({ candidatedata: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  shortlistmodal = () => {
    this.openModal();

    var canarr = this.state.candidatedata;
    var shortedcanarr = this.state.shorlisted;
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

    var opt = [];
    userdetails.forEach(ele => {
      var displayname = `${ele.firstName} ${ele.lastName}`;

      opt.push({ value: ele._id, label: displayname });
    });

    this.setState({ selectoptionsnamelist: opt });

    console.log(opt);
  };

  handleChangemodalselect = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  shortlisting = (id, bxstate) => {
    if (bxstate) {
      this.setState({ numofshort: this.state.numofshort + 1 });
      this.setState({
        shorlisted: [...this.state.shorlisted, id]
      });
    } else {
      this.setState({ numofshort: this.state.numofshort - 1 });
      var arr = this.state.shorlisted;

      var key = arr.indexOf(id);

      console.log(key);

      if (key !== -1) {
        arr.splice(key, 1);
        this.setState({ shorlisted: arr });
      }

      //
    }

    setTimeout(() => {
      console.log(
        "clicked from card id -  " +
          id +
          "bx state - " +
          bxstate +
          " num of resumes - " +
          this.state.numofshort +
          " resumeids - " +
          this.state.shorlisted
      );
    }, 1000);
  };

  shorlisthandler = () => {
    console.log(
      "on the way + " +
        JSON.stringify(this.state.selectedOption) +
        " candidates -  " +
        this.state.shorlisted
    );

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var payload = {
      allocateduser: this.state.selectedOption.value,
      candidatesallocated: this.state.shorlisted
    };

    console.log(payload);

    axios
      .post("/usr/shortlistMany/" + this.state.id, payload, config)
      .then(res => {
        console.log(res);
        this.closeModal();
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getuserdata = () => {
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
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.greet();
    console.log("mount");

    var jwt = localStorage.getItem("jwt");
    var now = new Date();
    console.log(now.getHours());

    // try {
    //   var dashboard = jsonwebtoken.verify(jwt)
    //   if(dashboard){
    //     this.setState({logedin:true})
    //   }
    // } catch (error) {
    //   this.setState({logedin:true})
    //   console.log(error)

    // }

    var config = {
      headers: { authorization: jwt }
    };
    axios
      .get("/usr/dashboard", config)
      .then(result => {
        console.log("sucsess" + result.data);
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
            shorlist:result.data.shortList

          });

          this.setState({ logedin: true });
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
    if (this.state.logedin === true) {
      var cndetailes = this.state.candidatedata;
      var usrdetails = this.state.userdata;
      const { selectedOption, selectoptionsnamelist } = this.state;
      return (
        <div className="dashboardmain">
          <Navbar />
          <p className="usrtype">Logged in as : {this.state.usertype}</p>
          <h1 className="greet">
            {this.state.greet} {this.state.firstName}
          </h1>
          <br />
          <br />
          <button
            onClick={this.usrprofile}
            className="btn btn-outline-primary"
            id="userprofile"
          >
            edit profile
          </button>
          <br />
          <br />

          <button
            onClick={this.addcandidate}
            className="btn btn-outline-primary"
            id="addcan"
          >
            Add new candidate
          </button>

          <button
            onClick={this.addcandidate}
            className="btn btn-outline-primary"
            id="shortlist"
            disabled={this.state.numofshort === 0}
            onClick={this.shortlistmodal}
          >
            Shortlist
          </button>

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
                className="btn"
                onClick={this.shorlisthandler}
                value="confirm shortlisting"
                id="submit"
              />
            </div>
          </Modal>

          {!this.state.emailverified && (
            <div class="alert alert-danger" role="alert">
              please verify your email
              <br />
              <button
                type="button"
                class="btn btn-outline-danger "
                id="verifyemailbtn"
                onClick={this.verifyemail}
              >
                verify email
              </button>
            </div>
          )}

          <div class="row">
            <div class="col-s4-m4-l4" id="cardcontainer1">
              {usrdetails.reverse().map(can => {
                //console.log(can.name+can.email+can.jobspec)
                return (
                  <UserCard
                    name={can.firstName + " " + can.lastName}
                    pendingcan={can.candidatesAssinged}
                  />
                );
              })}
            </div>

            <div class="col-s8 " id="cardcontainer2">
              {cndetailes.map((can, iid) => {
                //console.log(can.name+can.email+can.jobspec)
                /**
 * assignToshortlisterbyId: "5caa511c56a61d6a2492ec96"
assignToshortlisterbyName: "Bharana perera"
date: "2019-04-07T19:38:55.028Z"
email: "mark@facebook.com"
jobspec: "CCO"
name: "Mark Zuckerburg"
shortlister: "5caa51ad56a61d6a2492ec98"
shortlisterName: "Dewindi Anushika"
status: "onhold"
 */

                {
                  console.log(can.shortlister + " - dis ");
                }
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
                  />
                );
              })}
            </div>
          </div>

          <br />
          <br />
        </div>
      );
    } else {
      return <Redirect to={`/login`} />;
    }
  }
}

export default dashboard;
