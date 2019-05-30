import React, { Component } from "react";
import axios from "axios";
import "./candidateview.css";
import jsonwebtoken from "jsonwebtoken";
import Navbar from "../../components/navbar";
import exp from "../pdf.pdf";
import Modal from "react-modal";
import Select from "react-select";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

// import { Document } from 'react-pdf/dist/entry.webpack';

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

const customStyles2 = {
  content: {
    width: "90%",
    height: "80%",
    top: "50%",
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
    usertype: ""
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
  };

  addcvmodal = () => {
    this.openModal2();
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

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

  handleChangemodalselect = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
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
            window.location.reload(false);
          }
          this.closeModal();

        })
        .catch(err => {console.log(err)});
    } else {
      axios
        .post("/usr/shortlistOne/" + this.state.id, payload, config)
        .then(res => {
          console.log(JSON.stringify(res.data));
          //this.setState({shorlistSuccess:true})
          this.setState({ isLoading: false });
          if (res.data.msg == "allocated_success") {
            this.setState({ shorlistSuccess: true });
            window.location.reload(false);
          }
          this.closeModal();
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
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

    var usertype = localStorage.getItem("usertype");

    this.setState({ usertype: usertype });

    axios
      .get("/usr/getcandidate/" + id)
      .then(res => {
        console.log("date - - - -" + JSON.stringify(res.data));

        this.setState({
          data: res.data.candidateData,
          userarr: res.data.userData,
          cvUrl: res.data.candidateData.cvUrl
        });

        setTimeout(() => console.log(this.state), 1000);
      })
      .catch(err => {
        console.log(err);
      });

    //this.wtf();
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

  wtf = () => {
    // const id = this.props.match.params.id;
    // axios
    //   .get("/usr/getcandidate/" + id)
    //   .then(res => {
    //     this.setState({ data: res.data.candidateData });
    //     this.setState({ userarr: res.data.userData });
    //     this.setState({ cvUrl: res.data.candidateData.cvUrl });
    //     console.log(res);
    //     console.log(this.state);
    //     console.log("date - - - -" + JSON.stringify(res.data));
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  render() {
    if (this.state.data.date) {
      console.log("wjooop");
      console.log("date - - - -" + this.state.data.date);
      var dd = new Date(this.state.data.date);
      var d = dd.toJSON().slice(0, 10);
    }

    const { selectedOption, selectoptionsnamelist } = this.state;

    return (
      <div>
        <Navbar />
        <div className="canview">
          <div className="canview2">
            {this.state.status_change === 1 && (
              <div color="primary">status change succsessfuly</div>
            )}

            {this.state.shorlistSuccess && (
              <div color="primary">Allocated for shorlisting succsessfuly</div>
            )}

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
                  this candidate is currently assiged to{" "}
                  {this.state.data.shortlisterName} do you want to
                  overide it{" "}
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
              isOpen={this.state.modalIsOpen2}
              onAfterOpen={this.afterOpenModal2}
              onRequestClose={this.closeModal2}
              style={customStyles2}
              contentLabel="Example Modal 2"
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                {this.state.data.name + "'s" + " Resume"}
              </h2>

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
                      : "Change resume    "}
                  </label>
                  <input type="file" name="cv" onChange={this.chngehndlcv} />
                </div>
              }

              <div className="pdf" style={{ width: 1500 }}>
                <Document
                  loading={<div class="loader-candidateview" />}
                  file={this.state.cvUrl}
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

            {this.state.data.shortlisterName && (
              <label>
                {" "}
                Allocated to shortlist to - {
                  this.state.data.shortlisterName
                }{" "}
              </label>
            )}
            {this.state.data.assignToshortlisterbyName && (
              <label>
                {" "}
                Assigned by - {this.state.data.assignToshortlisterbyName}{" "}
              </label>
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

          <button onClick={this.shortlistmodal} className="btn btn-primary">
            alocate to shortlist
          </button>

          <button onClick={this.addcvmodal} className="btn btn-primary">
            add cv
          </button>

          <div class="form-group">
            <label
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
              hidden={
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
