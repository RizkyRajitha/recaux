import React, { Component } from "react";
import axios from "axios";
import "./candidateview.css";
import jsonwebtoken from 'jsonwebtoken'
import Navbar from "../../components/navbar";

import Modal from "react-modal";
import Select from "react-select";

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
Modal.setAppElement("#root");


class CandidateView extends Component {
  state = {
    data: "",
    userarr:[],
    status: "",
    status_change: 0,
    file: null,
    selectedOption: null,
    selectoptionsnamelist: [],
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

  shortlistmodal = () => {
    this.openModal();
  }

  handleChangemodalselect = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
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
      candidateallocated: this.state.data._id
    };

    console.log(payload);

    axios
      .post("/usr/shortlistOne/"+this.state.id, payload, config)
      .then(res => {
        console.log(res);
        this.closeModal()
        
      })
      .catch(err => {
        console.log(err);
      });
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
        this.setState({ data: res.data.candidateData });
        this.setState({ userarr: res.data.userData });
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

    const { selectedOption, selectoptionsnamelist } = this.state;

    return (
      <div>
        <Navbar />
        <div className="canview">
          <div className="canview2">
            {this.state.status_change === 1 && (
              <div color="primary" >
                status change succsessfuly
              </div>
            )}

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



{
  /**
  assignToshortlisterbyId: "5caa511c56a61d6a2492ec96"
assignToshortlisterbyName: "Bharana perera"
date: "2019-05-03T14:55:20.889Z"
email: "mark@facebook.com"
jobspec: "CCO"
name: "Mark Zuckerburg"
shortlister: "5caa511c56a61d6a2492ec96"
shortlisterName: "Bharana perera"
status: "New"
  */
}

 {this.state.data.shortlisterName && <label> Allocated to shortlist to -   {this.state.data.shortlisterName} </label>}
      {this.state.data.assignToshortlisterbyName && <label> Assigned by -   {this.state.data.assignToshortlisterbyName} </label>}




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
