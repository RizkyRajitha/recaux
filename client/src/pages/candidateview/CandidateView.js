import React, { Component } from "react";
import axios from "axios";
import "./candidateview.css";
import jsonwebtoken from "jsonwebtoken";
import Navbar from "../../components/navbar";
//import exp from "../pdf.pdf";
import Modal from "react-modal";
import BaseSelect from "react-select";
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
import ChipsArrayPanal from "./components/skillsChipWithDeletePanal";

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
import FixRequiredSelect from "./fixreqselect";

const Select = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={props.options}
    value={props.value}
    onChange={props.onChange}
  />
);

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;
const FileDownload = require("file-saver");
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
    width: "40%",
    height: "70%",
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    "overflow-x": "hidden"
  }
};

const customStyles7 = {
  content: {
    width: "40%",
    height: "70%",
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    "overflow-x": "hidden"
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
    selectoptionsjobspeclist: [],
    selectedOption: "",
    selectedJobspecOption: "",
    selectedinterviwerOption: "",
    selectedinterviwerOptionreschdule: "",
    selectedDate: new Date(),
    snackbaropen: false,
    snackbarmsg: "",
    selectedinterviwertype: "",
    finalstatus: "",
    slectformchipplanal: false,
    slectformchipplanalreschedule: false,
    interviewpanal: [],
    currentskillskeyvals: [],
    rendercurrenskills: false,
    hrstatusintervietype: "",
    interviewtypeoptions: [],
    rescheduleinterviewtype: "",
    selectedDatereschdule: new Date()
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
    this.setState({ hrstatusintervietype: "firstinterview" });
    this.openModal5();
  };

  changestatusforhr2 = () => {
    this.setState({ hrstatusintervietype: "secondinterview" });
    this.openModal5();
  };
  changestatusforhr3 = () => {
    this.setState({ hrstatusintervietype: "clientinterview" });
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

  openModal7 = () => {
    this.setState({ modalIsOpen7: true });
  };

  afterOpenModal7 = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
    this.subtitle.style.textAlign = "center";
  };

  closeModal7 = () => {
    this.setState({ modalIsOpen7: false });
  };

  reschedulemodal1 = () => {
    this.setState({ rescheduleinterviewtype: "firstinterview" });
    this.openModal7();
  };

  reschedulemodal2 = () => {
    this.setState({ rescheduleinterviewtype: "secondinterview" });
    this.openModal7();
  };
  reschedulemodal3 = () => {
    this.setState({ rescheduleinterviewtype: "clientinterview" });
    this.openModal7();
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

  handleChangemodalselectedinterviwertype = int => {
    console.log(int);

    this.setState({ selectedinterviwertype: int });
  }; //handlefinalstatus

  // handlefinalstatus = int => {
  //   console.log(int);

  //   this.setState({ finalstatus: int.value });
  // }; //handlefinalstatus

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

  handlefinalstatus = finaloption => {
    // this.setState({ finalstatus: });
    console.log(`final status selected:`, finaloption);

    const jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .post(
        "/usr/updatefinalstatus",
        { canid: this.state.data._id, finalstatus: finaloption.value },
        config
      )
      .then(res => {
        console.log("updatefinal");
        console.log(res.data);

        if (res.data.msg === "sucsess") {
          this.setState({
            snackbaropen: true,
            snackbarmsg: "Final state updated sucessfully"
          });
        } else {
          this.setState({
            snackbaropen: true,
            snackbarmsg: "Final state updated error , less previladges"
          });
        }
      })
      .catch(err => console.log(err));
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

  handleChangemodalselectjobspec = selectedOption => {
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
    this.setState({
      selectedinterviwerOption: selectedOption,
      slectformchipplanal: false
    });

    //this.setState({ slectformchipplanal: true });

    setTimeout(() => {
      this.setState({ slectformchipplanal: true });
    }, 100);

    //this.forceUpdate()
    console.log(this.state.selectedinterviwerOption);
  };

  handleChangemodalselectscheduleinterviewinterviewerreschdule = selectedOption => {
    console.log(selectedOption);
    console.log("................");
    this.setState({
      selectedinterviwerOptionreschdule: selectedOption,
      slectformchipplanalreschedule: false
    });

    //this.setState({ slectformchipplanal: true });

    setTimeout(() => {
      this.setState({ slectformchipplanalreschedule: true });
    }, 100);

    //this.forceUpdate()
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

        if (res.data.candidateData.interview3) {
          this.setState({
            interviewtypeoptions: []
          });
        } else if (res.data.candidateData.interview2) {
          this.setState({
            interviewtypeoptions: [
              {
                label: "Client interview",
                value: "clientinterview"
              }
            ]
          });
        } else if (res.data.candidateData.interview) {
          this.setState({
            interviewtypeoptions: [
              {
                label: "Second interview",
                value: "secondinterview"
              },
              {
                label: "Client interview",
                value: "clientinterview"
              }
            ]
          });
        } else {
          this.setState({
            interviewtypeoptions: [
              {
                label: "First interview",
                value: "firstinterview"
              },
              {
                label: "Second interview",
                value: "secondinterview"
              },
              {
                label: "Client interview",
                value: "clientinterview"
              }
            ]
          });
        }

        var arr = res.data.candidateData.skills;

        var keyrr = [];

        arr.forEach(element => {
          keyrr.push({ key: element.value, label: element.label });
        });

        this.setState({ currentskillskeyvals: keyrr });

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

        console.log("jobslistasds;kd;sankd;ks - - ");
        console.log("jobslistasds;kd;sankd;ks - - ");
        console.log("jobslistasds;kd;sankd;ks - - ");
        console.log("jobslistasds;kd;sankd;ks - - ");
        axios
          .get("/usr/getjobspeclist", config)
          .then(res => {
            console.log("jobslistasds;kd;sankd;ks - - ");
            console.log(res.data);

            this.setState({ selectoptionsjobspeclist: res.data.jobspeclist });
          })
          .catch(err => {});

        setTimeout(() => {
          console.log(this.state);
          this.setState({ rendercurrenskills: true });
        }, 1000);
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

  handleDateChangereschdule = e => {
    console.log(e);
    this.setState({ selectedDatereschdule: e });
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
          this.setState({
            snackbaropen: true,
            snackbarmsg: "Primary status update successfully"
          });
          this.closeModal1();
        }

        console.log("awoooooooooo");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          snackbaropen: true,
          snackbarmsg: "Primary status update error"
        });
        //this.setState({ status_change: 0 });
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

    var payload = {
      status: e.target.value,
      interivewtype: this.state.hrstatusintervietype
    };

    axios
      .post("/usr/updatesecondstatus/" + id, payload, config)
      .then(res => {
        console.log(res.data.msg);
        if (res.data.msg === "sucsess") {
          this.setState({ snackbaropen: true });
          this.setState({
            snackbarmsg: "Secondary status changed successfully"
          });
          // this.closeModal5();
        }

        console.log("awoooooooooo");
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackbaropen: true });
        this.setState({
          snackbarmsg:
            "Secondary status changed Failed : Error " + err.response.data.msg
        });
      });
  };

  valtokey = () => {};

  valtokeypanal = () => {
    var arr = [this.state.selectedinterviwerOption];

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

    var panalset = [];

    this.state.interviewpanal.forEach(element => {
      console.log(element.key);
      panalset.push(element.key);
    });

    console.log(this.state);

    var payload = {
      candidateid: this.state.data._id,
      scheduler: this.state.id,
      interviewer: this.state.selectedinterviwerOption.value,
      datetime: dataeinter.toISOString(),
      interviewtype: this.state.selectedinterviwertype.value,
      panal: panalset,
      panalwname: this.state.interviewpanal
    };

    console.log(payload);

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

    //for update
    // axios
    //   .post("/usr/updateinterview", payload, config)
    //   .then(res => {
    //     console.log(res.data.msg);
    //     if (res.data.msg === "sucsess") {
    //       //this.setState({ status_change: 1 });
    //       console.log("schedule interview");
    //       this.setState({
    //         snackbaropen: true,
    //         snackbarmsg: " Re-scheduled interview succsessfully"
    //       });
    //       this.closeModal6();
    //     }

    //     console.log("awoooooooooo");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({ status_change: 0 });
    //   });
  };

  rescheduleHandler = e => {
    e.preventDefault();
    console.log("add interview");
    console.log(this.state.selectedinterviwerOption);
    console.log("add interview");
    console.log(this.state.selectedDatereschdule);

    var token = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: token }
    };

    var dataeinter = moments(this.state.selectedDatereschdule._d);

    console.log();

    var panalset = [];

    this.state.interviewpanal.forEach(element => {
      console.log(element.key);
      panalset.push(element.key);
    });

    console.log(this.state);

    var payload = {
      candidateid: this.state.data._id,
      scheduler: this.state.id,
      interviewer: this.state.selectedinterviwerOptionreschdule.value,
      datetime: dataeinter.toISOString(),
      interviewtype: this.state.rescheduleinterviewtype,
      panal: panalset,
      panalwname: this.state.interviewpanal
    };

    console.log(payload);

    //for update
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
          this.closeModal7();
        }

        console.log("awoooooooooo");
      })
      .catch(err => {
        console.log(err);
        this.setState({ status_change: 0 });
      });
  };

  showevalpdf = () => {
    var token = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: token },
      responseType: "blob"
    };

    var id = this.props.match.params.id;

    //window.open("/usr/getevalpdf/" + id);

    // axios({
    //   url: "/usr/getevalpdf/" + id, //your url
    //   method: 'POST',
    //   responseType: 'blob', // important
    // }).then((response) => {
    //    const url = window.URL.createObjectURL(new Blob([response.data]));
    //    const link = document.createElement('a');
    //    link.href = url;
    //    link.setAttribute('download', 'file.pdf'); //or any other extension
    //    document.body.appendChild(link);
    //    link.click();
    // });

    axios
      .get("/usr/getevalpdf/" + id, config)
      .then(res => {
        console.log(res);
        //FileDownload(res.data);
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        //FileDownload(res.data, "evalpdf.pdf");
        FileDownload.saveAs(pdfBlob, this.state.data.name + "_evalpdf.pdf");

        if (res.data.msg === "sucsess") {
          // FileDownload()
        }
      })
      .catch(err => {});
  };

  gteinterviewpanal = panal => {
    console.log(panal);
    this.setState({ interviewpanal: panal });
  };

  outsourceproject = () => {
    this.props.history.push("/outsourceprojects/" + this.state.data._id);
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

        <div className="">
          <div className="">
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
                  isSearchable
                  required
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
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" />
                      <th scope="col" />
                      <th scope="col" />
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.cvUrl &&
                      this.state.cvUrl
                        // .slice()
                        // .reverse()
                        .map((singlecv, iidd) => {
                          return (
                            <tr>
                              <td>{iidd + 1}</td>
                              <td>
                                {". "}
                                Recieved -{" "}
                                {moments(
                                  singlecv.recievedDate,
                                  "YYYY-MM-DD HH:mm:ssZ"
                                ).fromNow()}
                              </td>
                              <td>
                                <button
                                  className="btn"
                                  onClick={() => this.viewoldcv(iidd)}
                                >
                                  <i class="far fa-eye" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
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
                <div hidden={true}>
                  <label className="uploadtaglable">
                    {this.state.data.cvUrl === null
                      ? "Upload resume    "
                      : "add new resume    "}
                  </label>
                  <input type="file" name="cv" onChange={this.chngehndlcv} />
                </div>
              }

              <a href={this.state.newest_cv_url} target="_blank">
                view externally
              </a>

              <br />

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

            <div class="container">
              <div class="row my-2">
                <div class="col-lg-8 order-lg-2">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a
                        href=""
                        data-target="#profile"
                        data-toggle="tab"
                        class="nav-link active"
                      >
                        Profile
                      </a>
                    </li>

                    <li class="nav-item">
                      <a
                        href=""
                        data-target="#edit"
                        data-toggle="tab"
                        class="nav-link"
                      >
                        Edit
                      </a>
                    </li>

                    <p className="rec"> Received:{this.state.recivedago}</p>
                  </ul>
                  <div class="tab-content py-4">
                    <div class="tab-pane active" id="profile">
                      {/* <h5 class="mb-3">User Profile</h5> */}
                      <div class="row">
                        <div class="col-md-6">
                          <h6 class="h6colorcanview">Email</h6>
                          <p class="pcolorcanview">{this.state.data.email}</p>
                          <Divider />
                          <h6 class="h6colorcanview"> Job Specification</h6>
                          <p class="pcolorcanview">{this.state.data.jobspec}</p>
                          <Divider />
                        </div>
                        <div class="col-md-6">
                          <h6 class="h6colorcanview">Skills</h6>

                          <ChipsArraywodelete
                            currentskills={this.state.data.skills}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="tab-pane" id="edit">
                      <div>
                        <form onSubmit={this.edidcandidatedetails}>
                          <div className="">
                            <div className="canviewborderdividcandidtaeeditdetails" />
                            <Select
                              isSearchable
                              required
                              placeholder={this.state.data.jobspec}
                              value={this.selectedJobspecOption}
                              onChange={this.handleChangemodalselectjobspec}
                              options={this.state.selectoptionsjobspeclist}
                            />
                            <div className="canviewborderdividcandidtaeeditdetails" />
                            {this.state.rendercurrenskills && (
                              <ChipsArraywdelete
                                id={this.state.data._id}
                                currentskills={this.state.currentskillskeyvals}
                              />
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 order-lg-1 text-center">
                  <img
                    src="https://www.pinclipart.com/picdir/big/200-2008697_account-customer-login-man-user-icon-login-icon.png"
                    style={{ width: 200, height: 200 }}
                    class="mx-auto img-fluid img-circle d-block"
                    alt="avatar"
                  />
                  <h3 class="mt-2">{this.state.data.name}</h3>
                  <div className="">
                    <span className="badge badge-pill badge-danger">
                      {this.state.data.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="btngroupdivcanview">
                <button
                  onClick={this.addcvmodal}
                  className="btn canviewbtngroup btn-primary"
                >
                  view cv
                </button>

                <button
                  onClick={this.viewcvsmodal}
                  className="btn canviewbtngroup btn-primary"
                >
                  candidate history
                </button>

                <button
                  onClick={this.openModal}
                  className="btn canviewbtngroup btn-primary"
                >
                  Allocate for shortlisting
                </button>
              </div>

              <div class="threecol">
                <div
                  class="col-md-12 xx"
                  hidden={!this.state.data.allocatedtoshorltistdone}
                >
                  <h6 className="shortlistheadingcanview">
                    {" "}
                    Shortlist Details{" "}
                  </h6>

                  <table class="table table-borderless ssss">
                    <tbody>
                      {/* <tr>
                        <td>
                          <h6 class="h6colorcanview">Assigned to</h6>
                        </td>
                        <td>angela jayathissa</td>
                      </tr> */}
                      {this.state.data.shortlisterName && (
                        <tr>
                          <td>
                            <h6 class="h6colorcanview"> Assigned to</h6>
                          </td>
                          <td>{this.state.data.shortlisterName}</td>
                        </tr>
                      )}
                      {this.state.data.assignToshortlisterbyName && (
                        <tr>
                          <td>
                            <h6 class="h6colorcanview"> Assigned by</h6>
                          </td>
                          <td>{this.state.data.assignToshortlisterbyName}</td>
                        </tr>
                      )}
                      {this.state.alocatedago && (
                        <tr>
                          <td>
                            <h6 class="h6colorcanview">allocated</h6>
                          </td>
                          <td>{this.state.alocatedago}</td>
                        </tr>
                      )}
                      {this.state.data.allocatedtoshorltistdone && ( //allocatedtoshorltistdone
                        <tr>
                          <td>
                            <h6 class="h6colorcanview">shortlist</h6>
                          </td>
                          <td>
                            {this.state.shortago
                              ? this.state.shortago
                              : "Pending"}
                          </td>
                        </tr>
                      )}

                      {this.state.data.primaryStatussetbyusertype && (
                        <tr>
                          <td>
                            <h6 class="h6colorcanview">
                              Status{" "}
                              {this.state.data.primaryStatussetbyusertype ===
                              "admin"
                                ? "overide by "
                                : "set by"}
                            </h6>
                          </td>
                          <td>
                            {this.state.data.primaryStatussetby + " "}{" "}
                            {this.state.data.primaryStatussetbyusertype ===
                            "admin" ? (
                              <span className="badge badge-pill badge-danger">
                                Admin
                              </span>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <button
                    hidden={
                      !this.state.shortago || this.state.usertype === "depthead"
                    }
                    onClick={this.schedule}
                    className="btn canviewbtngroup btn-primary"
                  >
                    schedule
                  </button>

                  <button
                    hidden={
                      this.state.data.shortlister !== this.state.id &&
                      !(this.state.usertype === "admin")
                        ? true
                        : false
                    }
                    onClick={this.changeStatusmodal}
                    className="btn canviewbtngroup btn-primary"
                  >
                    shorlist
                  </button>
                </div>

                <div
                  class="col col-lg-12 interviewseccanview "
                  hidden={!this.state.data.interviewscheduled}
                >
                  <div class="col order-lg-2">
                    <ul class="nav nav-tabs">
                      <li class="nav-item">
                        <a
                          href=""
                          data-target="#interview1"
                          data-toggle="tab"
                          class="nav-link active"
                        >
                          First interivew
                        </a>
                      </li>

                      <li class="nav-item">
                        <a
                          href=""
                          data-target="#interview2"
                          data-toggle="tab"
                          class="nav-link"
                          hidden={!this.state.data.interview2}
                        >
                          Second interivew
                        </a>
                      </li>

                      <li class="nav-item">
                        <a
                          href=""
                          data-target="#interview3"
                          data-toggle="tab"
                          class="nav-link"
                          hidden={!this.state.data.interview3}
                        >
                          Client interivew
                        </a>
                      </li>
                    </ul>
                    <div class="tab-content py-4">
                      <div class="tab-pane active" id="interview1">
                        <h6 className="shortlistheadingcanview">
                          {" "}
                          Interview Details First interivew
                        </h6>
                        <table class="table table-borderless ssss">
                          <tbody>
                            <tr>
                              <td>
                                <h6 class="h6colorcanview">Interview type</h6>
                              </td>
                              <td>{this.state.data.interviewtype}</td>
                            </tr>
                            <tr>
                              <td>
                                <h6 class="h6colorcanview">
                                  Interview Scheduled By
                                </h6>
                              </td>
                              <td>{this.state.data.schedulerName}</td>
                            </tr>
                            <tr>
                              {" "}
                              <td>
                                <h6 class="h6colorcanview">Interviewer</h6>{" "}
                              </td>
                              <td>{this.state.data.interviewerName}</td>
                            </tr>
                            <tr>
                              {" "}
                              <td>
                                <h6 class="h6colorcanview">Interviewe panal</h6>{" "}
                              </td>
                              <td>
                                <ChipsArraywodelete
                                  currentskills={this.state.data.panalwname}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6 class="h6colorcanview">Interviewe Time</h6>{" "}
                              </td>
                              <td>
                                {moments(this.state.data.interviewtime)
                                  .toDate()
                                  .toDateString() +
                                  "  " +
                                  " at " +
                                  moments(
                                    this.state.data.interviewtime
                                  ).hour() +
                                  ":" +
                                  moments(
                                    this.state.data.interviewtime
                                  ).minute()}
                                <span>
                                  {" "}
                                  {moments(
                                    this.state.data.interviewtime
                                  ).fromNow()}{" "}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6 class="h6colorcanview">
                                  Interviewe status
                                </h6>{" "}
                              </td>
                              <td>
                                {this.state.data.statusHrinterview
                                  ? `${
                                      this.state.data.statusHrinterview
                                    } ${"Set by " +
                                      this.state.data.statusHrsetby +
                                      " on "}       ${moments(
                                      this.state.data.statusHrdate
                                    )
                                      .toDate()
                                      .toDateString() +
                                      "  " +
                                      " at " +
                                      moments(
                                        this.state.data.statusHrdate
                                      ).hour() +
                                      ":" +
                                      moments(
                                        this.state.data.statusHrdate
                                      ).minute()} `
                                  : "Pending..."}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          hidden={
                            this.state.usertype === "depthead" ? true : false
                          }
                          onClick={this.changestatusforhr}
                          className="btn canviewbtngroup btn-primary"
                        >
                          change secondary status
                        </button>
                        <button
                          hidden={
                            this.state.usertype === "depthead" ? true : false
                          }
                          onClick={this.reschedulemodal1}
                          className="btn canviewbtngroup btn-primary"
                        >
                          Re-schedule Interview
                        </button>

                        {this.state.data.interviewed ? (
                          <button
                            onClick={this.showevalpdf}
                            className="btn canviewbtngroup btn-primary"
                          >
                            Evaluation PDF
                          </button>
                        ) : (
                          <button
                            onClick={this.evalHndler}
                            hidden={
                              !(this.state.id === this.state.data.interviewerId)
                            }
                            className="btn canviewbtngroup btn-primary"
                          >
                            evaluate
                          </button>
                        )}
                      </div>

                      <div class="tab-pane" id="interview2">
                        <div class="tab-pane active" id="interview1">
                          <h6 className="shortlistheadingcanview">
                            Interview Details Second interivew
                          </h6>
                          <table class="table table-borderless ssss">
                            <tbody>
                              <tr>
                                <td>
                                  <h6 class="h6colorcanview">Interview type</h6>
                                </td>
                                <td>{this.state.data.interviewtype2}</td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 class="h6colorcanview">
                                    Interview Scheduled By
                                  </h6>
                                </td>
                                <td>{this.state.data.schedulerName2}</td>
                              </tr>
                              <tr>
                                {" "}
                                <td>
                                  <h6 class="h6colorcanview">Interviewer</h6>{" "}
                                </td>
                                <td>{this.state.data.interviewerName2}</td>
                              </tr>
                              <tr>
                                {" "}
                                <td>
                                  <h6 class="h6colorcanview">
                                    Interviewe panal
                                  </h6>{" "}
                                </td>
                                <td>
                                  <ChipsArraywodelete
                                    currentskills={this.state.data.panalwname2}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 class="h6colorcanview">
                                    Interviewe Time
                                  </h6>{" "}
                                </td>
                                <td>
                                  {moments(this.state.data.interviewtime2)
                                    .toDate()
                                    .toDateString() +
                                    "  " +
                                    " at " +
                                    moments(
                                      this.state.data.interviewtime2
                                    ).hour() +
                                    ":" +
                                    moments(
                                      this.state.data.interviewtime2
                                    ).minute()}
                                  <span>
                                    {" "}
                                    {moments(
                                      this.state.data.interviewtime2
                                    ).fromNow()}{" "}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 class="h6colorcanview">
                                    Interviewe status
                                  </h6>{" "}
                                </td>
                                <td>
                                  {this.state.data.statusHrinterview2
                                    ? `${
                                        this.state.data.statusHrinterview2
                                      } ${"Set by " +
                                        this.state.data.statusHrsetby2 +
                                        " on "}       ${moments(
                                        this.state.data.statusHrdate2
                                      )
                                        .toDate()
                                        .toDateString() +
                                        "  " +
                                        " at " +
                                        moments(
                                          this.state.data.statusHrdate2
                                        ).hour() +
                                        ":" +
                                        moments(
                                          this.state.data.statusHrdate2
                                        ).minute()} `
                                    : "Pending..."}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <button
                            hidden={
                              this.state.usertype === "depthead" ? true : false
                            }
                            onClick={this.changestatusforhr2}
                            className="btn canviewbtngroup btn-primary"
                          >
                            change secondary status
                          </button>
                          <button
                            hidden={
                              this.state.usertype === "depthead" ? true : false
                            }
                            onClick={this.reschedulemodal2}
                            className="btn canviewbtngroup btn-primary"
                          >
                            Re-schedule Interview
                          </button>
                        </div>
                      </div>

                      <div class="tab-pane" id="interview3">
                        <div class="tab-pane active" id="interview1">
                          <h6 className="shortlistheadingcanview">
                            Interview Details Client interivew
                          </h6>
                          <table class="table table-borderless ssss">
                            <tbody>
                              <tr>
                                <td>
                                  <h6 class="h6colorcanview">Interview type</h6>
                                </td>
                                <td>{this.state.data.interviewtype3}</td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 class="h6colorcanview">
                                    Interview Scheduled By
                                  </h6>
                                </td>
                                <td>{this.state.data.schedulerName3}</td>
                              </tr>
                              <tr>
                                {" "}
                                <td>
                                  <h6 class="h6colorcanview">Interviewer</h6>{" "}
                                </td>
                                <td>{this.state.data.interviewerName3}</td>
                              </tr>
                              <tr>
                                {" "}
                                <td>
                                  <h6 class="h6colorcanview">
                                    Interviewe panal
                                  </h6>{" "}
                                </td>
                                <td>
                                  <ChipsArraywodelete
                                    currentskills={this.state.data.panalwname3}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 class="h6colorcanview">
                                    Interviewe Time
                                  </h6>{" "}
                                </td>
                                <td>
                                  {moments(this.state.data.interviewtime3)
                                    .toDate()
                                    .toDateString() +
                                    "  " +
                                    " at " +
                                    moments(
                                      this.state.data.interviewtime3
                                    ).hour() +
                                    ":" +
                                    moments(
                                      this.state.data.interviewtime3
                                    ).minute()}
                                  <span>
                                    {" "}
                                    {moments(
                                      this.state.data.interviewtime3
                                    ).fromNow()}{" "}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 class="h6colorcanview">
                                    Interviewe status
                                  </h6>{" "}
                                </td>
                                <td>
                                  {this.state.data.statusHrinterview3
                                    ? `${
                                        this.state.data.statusHrinterview3
                                      } ${"Set by " +
                                        this.state.data.statusHrsetby3 +
                                        " on "}       ${moments(
                                        this.state.data.statusHrdate3
                                      )
                                        .toDate()
                                        .toDateString() +
                                        "  " +
                                        " at " +
                                        moments(
                                          this.state.data.statusHrdate3
                                        ).hour() +
                                        ":" +
                                        moments(
                                          this.state.data.statusHrdate3
                                        ).minute()} `
                                    : "Pending..."}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <button
                            hidden={
                              this.state.usertype === "depthead" ? true : false
                            }
                            onClick={this.changestatusforhr3}
                            className="btn canviewbtngroup btn-primary"
                          >
                            change secondary status
                          </button>
                          <button
                            hidden={
                              this.state.usertype === "depthead" ? true : false
                            }
                            onClick={this.reschedulemodal3}
                            className="btn canviewbtngroup btn-primary"
                          >
                            Re-schedule Interview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <table>
                    <tbody>
                      {this.state.data.finalStatussetby && (
                        <tr>
                          <td>
                            <h6 class="h6colorcanview">Final Status</h6>
                          </td>
                          <td>
                            {this.state.data.finalStatus === "accepted" ? (
                              <span className="badge badge-pill badge-success">
                                Accepted
                              </span>
                            ) : (
                              <span className="badge badge-pill badge-danger">
                                Rejected
                              </span>
                            )}
                            <br />
                            {"Set by " +
                              this.state.data.primaryStatussetby +
                              " on "}

                            {moments(this.state.data.finalStatusdate)
                              .toDate()
                              .toDateString() +
                              "  " +
                              " at " +
                              moments(this.state.data.finalStatusdate).hour() +
                              ":" +
                              moments(this.state.data.finalStatusdate).minute()}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <button
                    onClick={this.outsourceproject}
                    className="btn canviewbtngroup btn-primary"
                    hidden={
                      this.state.usertype === "depthead" ||
                      this.state.usertype === "admin"
                        ? false
                        : true
                    }
                  >
                    generate formal resume
                  </button>

                  <div
                    className="finalstateforinterviewcanview"
                    hidden={
                      this.state.data.interviewerId === this.state.id ||
                      this.state.usertype === "admin"
                        ? false
                        : true
                    }
                  >
                    Final Status
                    <BaseSelect
                      value={this.state.finalstatus}
                      //placeholder={this.state.selectedinterviwertype.label}
                      onChange={this.handlefinalstatus}
                      options={[
                        {
                          label: "Accepted",
                          value: "accepted"
                        },
                        {
                          label: "Rejected",
                          value: "rejected"
                        }
                      ]}
                    />
                  </div>
                </div>
                {/* 
                <div className="paddingdivforcanview">
                  <p className="paddingdivforcanview">
                    Sorry i had no choice :( sad devoloper
                  </p>
                </div> */}

                {/* <div class="col-md-12 xx">
                  <h6 className="shortlistheadingcanview">
                    {" "}
                    Evaluation Details{" "}
                  </h6>
                  <table class="table table-borderless ">
                    <tbody>
                      <tr>
                        <td>
                          <h6 class="h6colorcanview">Assigned to</h6>
                        </td>
                        <td>angela jayathissa</td>
                      </tr>
                      <tr>
                        <td>Assigned by</td>
                        <td>kalani welagedara</td>
                      </tr>
                      <tr>
                        <td>shortlist</td>
                        <td>20 hours</td>
                      </tr>
                      <tr>
                        <td>allocated</td>
                        <td>2 days ago</td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
          </div>

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
                <option id="status" value="rejected">
                  Rejected
                </option>
                <option id="status" value="onhold">
                  onhold
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
                  this.state.usertype === "hr_staff"
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
                <option id="status" value="present">
                  present
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
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              Schedule {" " + this.state.data.name + "'s interview"}{" "}
            </h2>

            <Container>
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
                    <td>Interview type </td>
                    <td>
                      <Select
                        isSearchable
                        required
                        value={this.state.selectedinterviwertype}
                        //placeholder={this.state.selectedinterviwertype.label}
                        onChange={this.handleChangemodalselectedinterviwertype}
                        options={this.state.interviewtypeoptions}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>interviewer - </td>
                    <td>
                      {" "}
                      <Select
                        isSearchable
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

                  <tr>
                    <td>interviewe panal- </td>
                    <td>
                      <div className="" />

                      {this.state.slectformchipplanal && (
                        <ChipsArrayPanal
                          id={this.state.data._id}
                          //remuser={this.state.selectedinterviwerOption}
                          currentpanal={[
                            {
                              key: this.state.selectedinterviwerOption.value,
                              label: this.state.selectedinterviwerOption.label
                            }
                          ]}
                          setpanal={this.gteinterviewpanal}
                        />
                      )}
                    </td>
                  </tr>
                </table>
                <Button
                  className="btn canviewbtngroup btn-primary"
                  type="submit"
                >
                  Confirm Interview
                </Button>
              </form>
            </Container>
          </Modal>

          <Modal
            isOpen={this.state.modalIsOpen7}
            onAfterOpen={this.afterOpenModal7}
            onRequestClose={this.closeModal7}
            style={customStyles7}
            contentLabel="Modal Re-Schedule"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              Re-schedule {" " + this.state.data.name + "'s interview"}{" "}
            </h2>

            <Container>
              <form onSubmit={this.rescheduleHandler}>
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
                    <td>Interview type </td>
                    <td>{this.state.rescheduleinterviewtype}</td>
                  </tr>

                  <tr>
                    <td>interviewer - </td>
                    <td>
                      {" "}
                      <Select
                        isSearchable
                        required
                        value={this.state.selectedinterviwerOptionreschdule}
                        placeholder={
                          this.state.selectedinterviwerOptionreschdule.label
                        }
                        onChange={
                          this
                            .handleChangemodalselectscheduleinterviewinterviewerreschdule
                        }
                        options={this.state.userarr}
                      />{" "}
                    </td>
                  </tr>
                  <td>Date &amp; time</td>
                  <td>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        value={this.state.selectedDatereschdule}
                        onChange={this.handleDateChangereschdule}
                        disablePast={true}
                      />
                    </MuiPickersUtilsProvider>
                  </td>

                  <tr>
                    <td>interviewe panal- </td>
                    <td>
                      <div className="" />

                      {this.state.slectformchipplanalreschedule && (
                        <ChipsArrayPanal
                          id={this.state.data._id}
                          //remuser={this.state.selectedinterviwerOption}
                          currentpanal={[
                            {
                              key: this.state.selectedinterviwerOptionreschdule
                                .value,
                              label: this.state
                                .selectedinterviwerOptionreschdule.label
                            }
                          ]}
                          setpanal={this.gteinterviewpanal}
                        />
                      )}
                    </td>
                  </tr>
                </table>
                <Button
                  className="btn canviewbtngroup btn-primary"
                  type="submit"
                >
                  Confirm Interview Re-schedule
                </Button>
              </form>
            </Container>
          </Modal>

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
