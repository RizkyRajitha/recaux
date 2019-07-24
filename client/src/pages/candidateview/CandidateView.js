import React, { Component } from "react";
import axios from "axios";
import "./candidateview.css";
import jsonwebtoken from "jsonwebtoken";
import Navbar from "../../components/navbar";
//import exp from "../pdf.pdf";
import Modal from "react-modal";
import Select from "react-select";
import Drawer from "../../components/sidenav";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Container from "@material-ui/core/Container/Container";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Drafts from "@material-ui/icons/Drafts";
import NextWeek from "@material-ui/icons/NextWeek";
import SubdirectoryArrowRight from "@material-ui/icons/SubdirectoryArrowRight";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Gavel from "@material-ui/icons/Gavel";
import WatchLater from "@material-ui/icons/WatchLater";
import Divider from "@material-ui/core/Divider";
import { Document, Page, pdfjs } from "react-pdf";
import ChipsArraywdelete from "./components/skillschipsWithDelete";
import ChipsArraywodelete from "./components/skillChipsWithoutDeleye";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import moments from "moment";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Button } from "@material-ui/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

// import { Document } from 'react-pdf/dist/entry.webpack';

const customStyles = {
  content: {
    width: "50%",
    height: "30%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const customStyles2 = {
  content: {
    width: "80%",
    height: "80%",
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const customStyles3 = {
  content: {
    width: "50%",
    height: "40%",
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const customStyles4 = {
  content: {
    width: "60%",
    height: "60%",
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const customStyles5 = {
  content: {
    width: "80%",
    height: "70%",
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const customStyles6 = {
  content: {
    width: "50%",
    height: "40%",
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

class CandidateView extends Component {
  state = {
    data: "",
    userarr: [],
    status: "",
    status_change: 0,
    file: null,
    selectedOption: null,
    selectoptionsnamelist: [],
    shorlistSuccess: false,
    numPages: null,
    cvFile: null,
    cvUrl: null,
    cvNotFOundErr: false,
    errfiletoolarge: false,
    unsupportedFormat: false,
    isLoading: false,
    usertype: "",
    id: null,
    firstName: "",
    lastName: "",
    recivedago: "",
    shortago: "",
    alocatedago: "",
    avatarUrl: false,
    newest_cv_url: null,
    newest_cv_date: null,
    changedjobspec: null,
    editcanSuccess: false,
    selectoptionsnamelist: [],
    selectedOption: "",
    selectedJobspecOption: "",
    selectedinterviwerOption: "",
    selectedDate: new Date(),
    snackbaropen: false,
    snackbarmsg: ""
  };
  /****************************************** */
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  shortlistmodal = () => {
    this.openModal();
  };

  /***************************************** */

  openModal1 = () => {
    this.setState({ modalIsOpen1: true });
  };

  afterOpenModal1 = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal1 = () => {
    this.setState({ modalIsOpen1: false });
  };

  changeStatusmodal = () => {
    this.openModal1();
  };

  /***************************************** */
  openModal2 = () => {
    this.setState({ modalIsOpen2: true });
  };

  afterOpenModal2 = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal2 = () => {
    this.setState({ modalIsOpen2: false });
    var newesturl = this.state.cvUrl[this.state.cvUrl.length - 1].url;
    var newestdate = this.state.cvUrl[this.state.cvUrl.length - 1].recievedDate;

    this.setState({
      newest_cv_date: newestdate,
      newest_cv_url: newesturl
    });
  };

  addcvmodal = () => {
    this.openModal2();
  };

  /****************************************** */
  openModal3 = () => {
    this.setState({ modalIsOpen3: true });
  };

  afterOpenModal3 = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal3 = () => {
    this.setState({ modalIsOpen3: false });
  };

  viewcvsmodal = () => {
    this.openModal3();
  };

  /***************************************** */
  openModal4 = () => {
    this.setState({ modalIsOpen4: true });
  };

  afterOpenModal4 = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal4 = () => {
    this.setState({ modalIsOpen4: false });
  };

  editcandidatemodal = () => {
    this.openModal4();
  };

  /***************************************** */

  openModal5 = () => {
    this.setState({ modalIsOpen5: true });
  };

  afterOpenModal5 = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal5 = () => {
    this.setState({ modalIsOpen5: false });
  };

  changestatusforhr = () => {
    this.openModal5();
  };

  /***************************************** */

  openModal6 = () => {
    this.setState({ modalIsOpen6: true });
  };

  afterOpenModal6 = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal6 = () => {
    this.setState({ modalIsOpen6: false });
  };

  schedule = () => {
    this.openModal6();
  };

  /***************************************** */

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  /******************************************************************* */

  chngehndlcv = e => {
    this.setState({ cvFile: e.target.files[0] });
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
        this.setState({ cvUrl: result.data });
        this.setState({ isLoading: false });
        this.closeModal2();
      })
      .catch(
        function(error) {
          console.log("error - - -" + error);
          if (error.response.data) {
            this.setState({ isLoading: false });
            if ("file_too_large" === error.response.data) {
              this.setState({ errfiletoolarge: true });
            }

            if ("unsupported_file_format" === error.response.data) {
              this.setState({ unsupportedFormat: true });
            }
          }
        }.bind(this)
      );
  };

  cvUploadHandler = () => {
    if (this.state.cvFile === null) {
      this.setState({ cvNotFOundErr: true });
    } else {
      // this.setState({ isLoading: true });
      // this.setState({ cvNotFOundErr: false });
      // console.log(this.state.data);
      // console.log(this.state.data.cvUrl);
      // console.log("hahah");
      // console.log(this.props.match.params.id);
      // const formdata = new FormData();
      // formdata.append("cv", this.state.cvFile);
      // //
      // var jwt = localStorage.getItem("jwt");
      // var config = {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //     authorization: jwt
      //   }
      // };
      // axios
      //   .post("/usr/cv/" + this.props.match.params.id, formdata, config)
      //   .then(result => {
      //     console.log("awoooo" + JSON.stringify(result));
      //     this.setState({ cvUrl: result.data.url });
      //     this.setState({ isLoading: false });
      //   })
      //   .catch(
      //     function(error) {
      //       console.log(error.response.data);
      //       this.setState({ isLoading: false });
      //       if ("file_too_large" === error.response.data) {
      //         this.setState({ errfiletoolarge: true });
      //       }
      //       if ("unsupported_file_format" === error.response.data) {
      //         this.setState({ unsupportedFormat: true });
      //       }
      //     }.bind(this)
      //   );
    }
  };

  /***************************************** */

  onchangejobspec = e => {
    console.log("hai" + e.target.value);
    //this.setState({changedjobspec:e.target.value})
    //this.setState({ ...this.state.data, jobspec: e.target.value });
    this.state.data.jobspec = e.target.value;
    this.forceUpdate();
    console.log("hai" + this.state.data.jobspec);
  };

  edidcandidatedetails = e => {
    e.preventDefault();
    //console.log("hai"+e.target.value);
    this.setState({ isLoading: true });
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var payload = {
      newjobspec: this.state.data.jobspec
    };

    console.log(this.state.data._id);

    axios
      .post("/usr/edituserdetails/" + this.state.data._id, payload, config)
      .then(res => {
        console.log(JSON.stringify(res.data));
        //this.setState({shorlistSuccess:true})
        this.setState({ isLoading: false });
        if (res.data.msg == "edit_success") {
          //this.setState({ editcanSuccess: true });
          //window.location.reload(false);
          this.closeModal4();
        }

        setTimeout(() => {
          this.setState({ open: true });
        }, 2500);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  handleChangemodalselect = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  viewoldcv = cancvid => {
    console.log("cv id - " + cancvid);
    this.setState({
      newest_cv_url: this.state.cvUrl[cancvid].url,
      newest_cv_date: this.state.cvUrl[cancvid].recievedDate
    });

    this.openModal2();
  };

  shorlisthandler = () => {
    this.setState({ isLoading: true });
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
      candidateallocated: this.state.data._id
    };

    console.log("sent payload" + payload);

    if (this.state.data.assignToshortlisterbyName) {
      console.log("overide");
      var payloadOveride = {
        newallocateduser: this.state.selectedOption.value,
        candidateallocated: this.state.data._id,
        oldAllocateuser: this.state.data.shortlister
      };

      console.log("send data - overide - " + JSON.stringify(payloadOveride));

      axios
        .post("/usr/shortlistOneOveride", payloadOveride, config)
        .then(results => {
          this.setState({ isLoading: false });
          if (results.data.msg == "allocated_success") {
            this.setState({ shorlistSuccess: true });
            this.setState({
              snackbaropen: true,
              snackbarmsg: "shortlist updated succsessfully"
            });
            //window.location.reload(false);
          }
          this.closeModal();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post("/usr/shortlistOne/" + this.state.id, payload, config)
        .then(res => {
          console.log(JSON.stringify(res.data));
          //this.setState({shorlistSuccess:true})
          this.setState({ isLoading: false });
          if (res.data.msg == "allocated_success") {
            this.setState({
              snackbaropen: true,
              snackbarmsg: "added to shortlist succsessfully"
            });

            //window.location.reload(false);
          }
          this.closeModal();
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
  };

  handleChangemodalselect = selectedOption => {
    console.log("jobspec selected -  " + selectedOption);
    this.setState({ isLoading: true });
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var payload = {
      newjobspec: selectedOption.label //this.state.data.jobspec
    };

    console.log(this.state.data._id);

    axios
      .post("/usr/editcandidatedetails/" + this.state.data._id, payload, config)
      .then(res => {
        console.log(JSON.stringify(res.data));
        //this.setState({shorlistSuccess:true})
        this.setState({ isLoading: false });
        if (res.data.msg == "edit_success") {
          //this.setState({ editcanSuccess: true });
          this.setState({
            snackbaropen: true,
            snackbarmsg: "candidate edited successfully"
          });
          //window.location.reload(false);
        }

        setTimeout(() => {
          this.closeModal4();
        }, 2500);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  handleChangemodalselectscheduleinterviewinterviewer = selectedOption => {
    console.log(selectedOption);
    console.log("................");
    this.setState({ selectedinterviwerOption: selectedOption });
    console.log(this.state.selectedinterviwerOption);
  };

  componentDidMount() {
    console.log("comp did mount");

    const id = this.props.match.params.id;
    console.log(id);

    const jwt = localStorage.getItem("jwt");
    //console.log("jwt token -- - -- >>>" + jwt);

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

    // var usertype = localStorage.getItem("usertype");

    // this.setState({ usertype: usertype });

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .get("/usr/basicuserdetails", config)
      .then(res => {
        console.log(res.data);
        var datain = res.data;

        var preurl = res.data.avatarUrl.slice(0, 48);
        var posturl = res.data.avatarUrl.slice(49, res.data.avatarUrl.length);
        var config = "/w_290,h_295,c_thumb/";

        var baseUrl = preurl + config + posturl;
        this.setState({ avatarUrl: baseUrl });

        // var resdate = this.state.data.date
        //  var alodate = this.state.data.allocatedDate
        //  var shrtdate = this.state.data.shortlistedDate

        this.setState({
          id: datain.id,
          firstName: datain.firstName,
          lastName: datain.lastName,
          usertype: datain.usertype
        });
      })
      .catch(err => {});

    axios
      .get("/usr/getcandidate/" + id)
      .then(res => {
        console.log("data candidate - -  - - - -" + JSON.stringify(res.data));

        var recivedago = res.data.candidateData.date
          ? moments(
              res.data.candidateData.date,
              "YYYY-MM-DD HH:mm:ssZ"
            ).fromNow()
          : false;
        var alocatedago = res.data.candidateData.allocatedDate
          ? moments(
              res.data.candidateData.allocatedDate,
              "YYYY-MM-DD HH:mm:ssZ"
            ).fromNow()
          : false;
        var shortago = res.data.candidateData.shortlistedDate
          ? moments(
              res.data.candidateData.shortlistedDate,
              "YYYY-MM-DD HH:mm:ssZ"
            ).fromNow()
          : false;

        this.setState({
          data: res.data.candidateData,
          userarr: res.data.userData
        });

        var newesturl = "";
        if (res.data.candidateData.cvUrl) {
          newesturl =
            res.data.candidateData.cvUrl[
              res.data.candidateData.cvUrl.length - 1
            ].url;
        }

        var newestdate =
          res.data.candidateData.cvUrl[res.data.candidateData.cvUrl.length - 1]
            .recievedDate;

        this.setState({
          cvUrl: res.data.candidateData.cvUrl,
          recivedago: recivedago,
          alocatedago: alocatedago,
          shortago: shortago,
          newest_cv_date: newestdate,
          newest_cv_url: newesturl
        });

        axios
          .get("/usr/getjobspeclist", config)
          .then(res => {
            console.log("skillset - - ");
            console.log(res.data.jobspeclist);

            this.setState({ selectoptionsnamelist: res.data.jobspeclist });
          })
          .catch(err => {});

        setTimeout(() => console.log(this.state), 1000);
      })
      .catch(err => {
        console.log(err);
      });

    //this.wtf();
  }

  handleDateChange = e => {
    console.log(e);
    this.setState({ selectedDate: e });
  };

  evalHndler = () => {
    const id = this.props.match.params.id;

    console.log(this.state.data.shortlister + "  " + this.state.id);

    console.log("ddd - " + JSON.stringify(this.state));

    this.props.history.push("/evaluation/" + id);
  };

  chngehandlsel = e => {
    this.setState({ status_change: 0 });
    // this.setState({ status: e.target.value });
    console.log("status 1k" + e.target.value);
    var id = this.props.match.params.id;

    var token = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: token }
    };

    var payload = { status: e.target.value };

    axios
      .post("/usr/updatestatus/" + id, payload, config)
      .then(res => {
        console.log(res.data.msg);
        if (res.data.msg === "sucsess") {
          this.setState({ status_change: 1 });
          this.closeModal1();
        }

        console.log("awoooooooooo");
      })
      .catch(err => {
        console.log(err);
        this.setState({ status_change: 0 });
      });
  };

  chngehandlsecondarystate = e => {
    this.setState({ status_change: 0 });
    // this.setState({ status: e.target.value });
    console.log("status 1k" + e.target.value);
    var id = this.props.match.params.id;

    var token = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: token }
    };

    var payload = { status: e.target.value };

    axios
      .post("/usr/updatesecondstatus/" + id, payload, config)
      .then(res => {
        console.log(res.data.msg);
        if (res.data.msg === "sucsess") {
          this.setState({ status_change: 1 });
          this.closeModal5();
        }

        console.log("awoooooooooo");
      })
      .catch(err => {
        console.log(err);
        this.setState({ status_change: 0 });
      });
  };

  valtokey = () => {
    var arr = this.state.data.skills;

    var keyrr = [];

    arr.forEach(element => {
      keyrr.push({ key: element.value, label: element.label });
    });
    return keyrr;
  };

  scheduleHandler = e => {
    e.preventDefault();
    console.log("add interview");
    console.log(this.state.selectedinterviwerOption);
    console.log("add interview");
    console.log(this.state.selectedDate);

    var token = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: token }
    };

    var dataeinter = moments(this.state.selectedDate._d);

    console.log();

    var payload = {
      candidateid: this.state.data._id,
      scheduler: this.state.id,
      interviewer: this.state.selectedinterviwerOption.value,
      datetime: dataeinter.toISOString()
    };

    console.log(payload);

    if (this.state.data.interview) {
      console.log("update"); //updateinterview

      axios
        .post("/usr/updateinterview", payload, config)
        .then(res => {
          console.log(res.data.msg);
          if (res.data.msg === "sucsess") {
            //this.setState({ status_change: 1 });
            console.log("schedule interview");
            this.setState({
              snackbaropen: true,
              snackbarmsg: " Re-scheduled interview succsessfully"
            });
            this.closeModal6();
          }

          console.log("awoooooooooo");
        })
        .catch(err => {
          console.log(err);
          this.setState({ status_change: 0 });
        });
    } else {
      axios
        .post("/usr/addinterview", payload, config)
        .then(res => {
          console.log(res.data.msg);
          if (res.data.msg === "sucsess") {
            console.log("schedule first interview");
            this.setState({
              snackbaropen: true,
              snackbarmsg: " scheduled interview succsessfully"
            });
            this.closeModal6();
          }

          console.log("awoooooooooo");
        })
        .catch(err => {
          console.log(err);
          this.setState({ status_change: 0 });
        });
    }
  };

  render() {
    // if (this.state.recivedago) {
    //   console.log("wjooop");
    //   console.log("date - - - -" + this.state.recivedago);
    //   // var dd = new Date(this.state.data.date);
    // var d = dd.toJSON().slice(0, 10);

    //   /**
    //    * var s =this.props.allocatedDate//.slice(4, 24)
    //   //var s = this.props.date; //.slice(4, 24); //"2019-04-24 18:00:00";  // from action.timeStamp

    //   var actionTime = moments(s, "YYYY-MM-DD HH:mm:ssZ");
    //   //var actionTime = moments(s, "MMM-DD-YYYY HH:mm:ssZ");
    //   var timeAgo = actionTime.fromNow();

    //    */
    //    var resdate = this.state.data.date
    //   // var alodate = this.state.data.allocatedDate
    //   // var shrtdate = this.state.data.shortlistedDate
    //   var recivedago =  moments(resdate, "YYYY-MM-DD HH:mm:ssZ");
    //   // var alocatedago =  moments(alodate, "YYYY-MM-DD HH:mm:ssZ");
    //   // var shortago =  moments(shrtdate, "YYYY-MM-DD HH:mm:ssZ");

    // }

    const { selectedOption, selectoptionsnamelist } = this.state;
    const { snackbaropen } = this.state;
    return (
      <div>
        {/* <Navbar />
        <Drawer
          avatarUrl={this.state.avatarUrl}
          username={this.state.firstName + " " + this.state.lastName}
          type={this.state.usertype}
        /> */}

        <div className="canview">
          <div className="canview2">
            {this.state.status_change === 1 && (
              <div class="alert alert-success" role="alert">
                status change succsessfuly
              </div>
            )}

            {this.state.shorlistSuccess && (
              <div class="alert alert-success" role="alert">
                Allocated for shorlisting succsessfuly
              </div>
            )}

            {/* {this.state.editcanSuccess && (
              <div class="alert alert-success" role="alert">
                edited candidate succsessfuly
              </div>
            )} */}

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>confirm list</h2>

              {this.state.data.assignToshortlisterbyName && (
                <p>
                  {" "}
                  This candidate is currently assiged to{" "}
                  {this.state.data.shortlisterName} do you want to re-allocate
                  it.{" "}
                </p>
              )}
              <div class="input-field col s12">
                <p>{this.state.shortedcanarrnamelist}</p>

                <Select
                  value={selectedOption}
                  onChange={this.handleChangemodalselect}
                  options={this.state.userarr}
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

            <Modal
              isOpen={this.state.modalIsOpen3}
              onAfterOpen={this.afterOpenModal3}
              onRequestClose={this.closeModal3}
              style={customStyles3}
              contentLabel="Example Modal"
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}> cv list </h2>

              <div>
                <ul>
                  {this.state.cvUrl &&
                    this.state.cvUrl
                      // .slice()
                      // .reverse()
                      .map((singlecv, iidd) => {
                        return (
                          <li>
                            {iidd + 1}
                            {". "}
                            recived -{" "}
                            {moments(
                              singlecv.recievedDate,
                              "YYYY-MM-DD HH:mm:ssZ"
                            ).fromNow()}
                            <button
                              className="btn btn-primary"
                              onClick={() => this.viewoldcv(iidd)}
                            >
                              view
                            </button>
                          </li>
                        );
                      })}
                </ul>
              </div>
            </Modal>

            <Modal
              isOpen={this.state.modalIsOpen4}
              onAfterOpen={this.afterOpenModal4}
              onRequestClose={this.closeModal4}
              style={customStyles4}
              contentLabel="Example Modal"
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                {" "}
                edit {this.state.data.name}{" "}
              </h2>
              <div>
                <form onSubmit={this.edidcandidatedetails}>
                  <div className="">
                    <input
                      required
                      type="text"
                      name="Candidate name"
                      className="form-control"
                      onChange={this.chngehandlfname}
                      id="firstName"
                      value={this.state.data.name}
                      disabled={true}
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="enter candidate email"
                      onChange={this.chngehandlemail}
                      id="email"
                      value={this.state.data.email}
                      disabled={true}
                    />
                    {/* <input
                      required
                      type="text"
                      name="job specification "
                      className="form-control"
                      onChange={this.onchangejobspec}
                      placeholder="enter new job specification"
                      id="jobspec"
                      value={this.state.data.jobspec}
                      // disabled={true}
                    /> */}
                    <div className="canviewborderdividcandidtaeeditdetails" />
                    <Select
                      placeholder={this.state.data.jobspec}
                      value={this.selectedJobspecOption}
                      onChange={this.handleChangemodalselect}
                      options={this.state.selectoptionsnamelist}
                    />
                    <div className="canviewborderdividcandidtaeeditdetails" />
                    <ChipsArraywdelete
                      id={this.state.data._id}
                      currentskills={this.valtokey}
                    />
                  </div>
                </form>
              </div>
            </Modal>

            <Modal
              isOpen={this.state.modalIsOpen2}
              onAfterOpen={this.afterOpenModal2}
              onRequestClose={this.closeModal2}
              style={customStyles2}
              contentLabel="Example Modal 2"
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                {this.state.data.name + "'s" + " Resume"}
              </h2>

              {/* <button type="button" class="close" aria-label="Close" onClick={this.closeModal2}>
                <span className="canviewmodal2closebtn" aria-hidden="true">&times;</span>
              </button> */}
              <div
                class="loader-candidateview"
                hidden={!this.state.isLoading}
              />

              {this.state.cvNotFOundErr && (
                <div class="alert alert-danger" role="alert">
                  Please select a file
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

              {console.log(
                "url - " +
                  this.state.data.cvUrl +
                  " 0 " +
                  (this.state.data.cvUrl === null)
              )}

              {
                <div>
                  <label className="uploadtaglable">
                    {this.state.data.cvUrl === null
                      ? "Upload resume    "
                      : "add new resume    "}
                  </label>
                  <input type="file" name="cv" onChange={this.chngehndlcv} />
                </div>
              }
              <label>
                Recieved -
                {moments(
                  this.state.newest_cv_date,
                  "YYYY-MM-DD HH:mm:ssZ"
                ).fromNow()}
              </label>
              <div className="pdf" style={{ width: 1500 }}>
                <Document
                  loading={<div class="loader-candidateview" />}
                  file={this.state.newest_cv_url}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  {/* <Page pageIndex={0} width={1500} /> */}

                  {Array.from(new Array(this.state.numPages), (el, index) => (
                    <Page
                      width={1500}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ))}
                </Document>
              </div>
            </Modal>

            {/**
  assignToshortlisterbyId: "5caa511c56a61d6a2492ec96"
assignToshortlisterbyName: "Bharana perera"
date: "2019-05-03T14:55:20.889Z"
email: "mark@facebook.com"
jobspec: "CCO"
name: "Mark Zuckerburg"
shortlister: "5caa511c56a61d6a2492ec96"
shortlisterName: "Bharana perera"
status: "New"
  */}

            <Container maxWidth="sm">
              <List
                style={{
                  width: "100%",
                  maxWidth: 360,
                  marginTop: -100
                }}
              >
                {this.state.recivedago && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <SubdirectoryArrowRight />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Received"
                      secondary={this.state.recivedago}
                    />
                  </ListItem>
                )}
                <Divider variant="inset" component="li" />
                {this.state.data.shortlisterName && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Assigned to"
                      secondary={this.state.data.shortlisterName}
                    />
                  </ListItem>
                )}{" "}
                <Divider variant="inset" component="li" />
                {this.state.data.assignToshortlisterbyName && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Assigned by"
                      secondary={this.state.data.assignToshortlisterbyName}
                    />
                  </ListItem>
                )}
                <Divider variant="inset" component="li" />
                {this.state.alocatedago && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WatchLater />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="allocated"
                      secondary={this.state.alocatedago}
                    />
                  </ListItem>
                )}
                <Divider variant="inset" component="li" />
                {this.state.shortago && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="shortlist"
                      secondary={this.state.shortago}
                    />
                  </ListItem>
                )}
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Name"
                    secondary={this.state.data.name}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Drafts />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Email"
                    secondary={this.state.data.email}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <NextWeek />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Job specification"
                    secondary={this.state.data.jobspec}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Gavel />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Current status"
                    secondary={this.state.data.status}
                  />
                </ListItem>
              </List>
            </Container>

            <ul className="list-group list-group-flush ">
              {/* {this.state.data.shortlisterName && (
                <li className="list-group-item">
                  Allocated to shortlist to - {this.state.data.shortlisterName}
                </li>
              )}

              {this.state.data.assignToshortlisterbyName && (
                <li className="list-group-item">
                  Assigned by - {this.state.data.assignToshortlisterbyName}
                </li>
              )}

              {this.state.recivedago && (
                <li className="list-group-item">
                  {" "}
                  recived - : {this.state.recivedago}
                </li>
              )}
              {this.state.alocatedago && (
                <li className="list-group-item">
                  {" "}
                  allocated - : {this.state.alocatedago}
                </li>
              )}
              {this.state.shortago && (
                <li className="list-group-item">
                  {" "}
                  shortlist - : {this.state.shortago}
                </li>
              )}
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
              </li> */}

              <ChipsArraywodelete currentskills={this.state.data.skills} />
            </ul>
          </div>

          <button
            disabled={this.state.usertype === "depthead" ? true : false}
            onClick={this.shortlistmodal}
            className="btn btn-primary"
          >
            allocate to shortlist
          </button>

          <button onClick={this.addcvmodal} className="btn btn-primary">
            view cv
          </button>

          <button
            disabled={
              this.state.data.shortlister !== this.state.id ||
              this.state.usertype === "admin"
                ? true
                : false
            }
            onClick={this.changeStatusmodal}
            className="btn btn-primary"
          >
            shorlist
          </button>

          <Modal
            isOpen={this.state.modalIsOpen1}
            onAfterOpen={this.afterOpenModal1}
            onRequestClose={this.closeModal1}
            style={customStyles}
            contentLabel="Example 1 Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>shortlist</h2>

            <div class="form-group">
              <label
                className="canviewshortlistform"
                for="exampleFormControlSelect2"
                hidden={
                  this.state.usertype === "admin" ||
                  this.state.usertype === "depthead"
                    ? false
                    : true
                }
              >
                change candidate status
              </label>

              <select
                disabled={
                  this.state.usertype === "admin" ||
                  this.state.usertype === "depthead"
                    ? false
                    : true
                }
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
          </Modal>

          <Modal
            isOpen={this.state.modalIsOpen5}
            onAfterOpen={this.afterOpenModal5}
            onRequestClose={this.closeModal5}
            style={customStyles}
            contentLabel="Example 5 Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>status</h2>

            <div class="form-group">
              <label
                className="canviewshortlistform"
                for="exampleFormControlSelect2"
                hidden={
                  this.state.usertype === "admin" ||
                  this.state.usertype === "depthead"
                    ? false
                    : true
                }
              >
                change candidate secondary status
              </label>

              <select
                class="form-control"
                id="status"
                onChange={this.chngehandlsecondarystate} //chngehandlsecondarystate
              >
                <option selected>Select...</option>
                <option id="status" value="cancel">
                  Canceled
                </option>
                <option id="status" value="noshow">
                  No show
                </option>
                {/* <option id="status" value="accepted">
                  accepted
                </option>
                <option id="status" value="shortlisted">
                  shortlisted
                </option> */}
              </select>
            </div>
          </Modal>

          <Modal
            isOpen={this.state.modalIsOpen6}
            onAfterOpen={this.afterOpenModal6}
            onRequestClose={this.closeModal6}
            style={customStyles6}
            contentLabel="Example 5 Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>Schedule</h2>

            <Container>
              {this.state.data.interview
                ? "this candidate has been scheduled to interview " +
                  this.state.data.interviewerName +
                  " on  " +
                  moments(this.state.data.interviewtime)
                    .toDate()
                    .toDateString() +
                  " in  " +
                  " on " +
                  moments(this.state.data.interviewtime).hour() +
                  ":" +
                  moments(this.state.data.interviewtime).minute() +
                  " do you want to update "
                : ""}

              <form onSubmit={this.scheduleHandler}>
                <table style={{ textAlign: "left", width: "50%" }}>
                  <tr>
                    <td>candidate name - </td>
                    <td> {this.state.data.name} </td>
                  </tr>
                  <tr>
                    <td>allocater name - </td>
                    <td>
                      {" "}
                      {this.state.firstName + " " + this.state.lastName}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>interviewer - </td>
                    <td>
                      {" "}
                      <Select
                        native
                        required
                        value={this.state.selectedinterviwerOption}
                        placeholder={this.state.selectedinterviwerOption.label}
                        onChange={
                          this
                            .handleChangemodalselectscheduleinterviewinterviewer
                        }
                        options={this.state.userarr}
                      />{" "}
                    </td>
                  </tr>
                  <td>Date &amp; time</td>
                  <td>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        disablePast={true}
                      />
                    </MuiPickersUtilsProvider>
                  </td>
                </table>
                <Button className="btn btn-primary" type="submit">
                  Confirm Interview
                </Button>
              </form>
            </Container>
          </Modal>

          <button
            disabled={this.state.usertype === "depthead" ? true : false}
            onClick={this.changestatusforhr}
            className="btn btn-primary"
          >
            change secondary status
          </button>

          <button onClick={this.evalHndler} className="btn btn-primary">
            evaluate
          </button>
          <button onClick={this.viewcvsmodal} className="btn btn-primary">
            candidate history
          </button>
          <button onClick={this.editcandidatemodal} className="btn btn-primary">
            edit candidate
          </button>
          <button onClick={this.schedule} className="btn btn-primary">
            schedule
          </button>
          <br />
          <br />

          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={snackbaropen}
            autoHideDuration={2000}
            onClose={() => this.setState({ snackbaropen: false })}
            //onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.snackbarmsg}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                //className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />

          {/* <Document file='http://localhost:3001/static/cv/5ca0526e92b4ad35ec5a314d.pdf'/> */}
        </div>
      </div>
    );
  }
}

export default CandidateView;
