import React, { Component } from "react";
import axios from "axios";
import Datepicker from "../../components/datepicker";
import Modal from "react-modal";
import Searchcard from "../../components/searchcard";
import Drawer from "../../components/sidenav";
import Navbar from "../../components/navbar";
import "./search.css";
const jwt = require("jsonwebtoken");

const customStyles = {
  content: {
    width: "50%",
    height: "85%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
}

Modal.setAppElement("#root")

class Search extends Component {
  state = {
    modalIsOpen: "",
    date: null,
    bothdatesselected: false,
    searchbydateResults: null,
    searchbyname_value: "",
    searchbynameResults: null,
    id: null,
    firstName: "",
    lastName: "",
    greet: "",
    usertype: "",
    avatarUrl: false,
    searchbydateclieked: false
  };

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

  searchModal = () => {
    this.openModal();
    this.setState({ searchbydateclieked: true });
  };

  getdatefromdatepicke = dateobj => {
    console.log("date from modal - " + JSON.stringify(dateobj));
    this.setState({ date: dateobj });

    if (dateobj.from && dateobj.to) {
      this.setState({ bothdatesselected: true });
    } else {
      this.setState({ bothdatesselected: true });
    }
  };

  resetdatepicker = () => {
    console.log("date reset - ");
    this.setState({ bothdatesselected: false, date: null });
  };

  submitesearchbydate = () => {
    if (this.state.date.from && this.state.date.to) {
      const token = localStorage.getItem("jwt");

      var config = {
        headers: { authorization: token }
      };

      console.log("submit date - " + JSON.stringify(this.state.date));

      var payload = this.state.date;

      axios
        .post("/usr/searchbydate", payload, config)
        .then(data => {
          console.log(data.data);
          this.setState({ searchbydateResults: data.data });
          this.closeModal();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("select a date");
      this.setState({ bothdatesselected: false, date: null });
    }
  };

  //searchbyname_value

  namehndlechange = e => {
    console.log("tr - " + e.target.value);
    this.setState({ searchbyname_value: e.target.value });

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    console.log("name sub - " + this.state.searchbyname_value);

    var payload = { name: e.target.value };

    axios
      .post("/usr/searchbyname", payload, config)
      .then(res => {
        console.log(res.data);
        this.setState({ searchbynameResults: res.data });
      })
      .catch(err => {});
  };

  submitesearchbyname = () => {
    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    console.log("name sub - " + this.state.searchbyname_value);

    var payload = { name: this.state.searchbyname_value };

    axios
      .post("/usr/searchbyname", payload, config)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {});
  };

  //searchbyname

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    //console.log("jwt token -- - -- >>>" + jwt);

    try {
      console.log("in register");
      var pay = jwt.verify(token, "authdemo");
      // console.log("payload - " + pay);
      console.log("************************************");
    } catch (error) {
      console.log("not logged in redirecting...............");
      this.props.history.push("/Login");
    }

    var config = {
      headers: { authorization: token }
    };

    axios
      .get("/usr/basicuserdetails", config)
      .then(res => {
        console.log(res.data);
        var datain = res.data;

        var preurl = res.data.avatarUrl.slice(0, 48);
        var posturl = res.data.avatarUrl.slice(
          49,
          res.data.avatarUrl.length
        );
        var config = "/w_220,h_295,c_thumb/";

        var baseUrl = preurl + config + posturl;
        this.setState({ avatarUrl: baseUrl });

        this.setState({
          id: datain._id,
          firstName: datain.firstName,
          lastName: datain.lastName,
          usertype: datain.usertype
        });
      })
      .catch(err => {});
  }

  render() {
    return (
      <div>
        <Navbar />
        <Drawer
          avatarUrl={this.state.avatarUrl}
          username={this.state.firstName + " " + this.state.lastName}
          type={this.state.usertype}
        />
        <p className="usrtype"> Logged in as : {this.state.usertype}</p>

        <div className="searchcontainer">   
          <button className="searchbydate" onClick={this.searchModal}>
            search by date
          </button>
          <div className="searcharea" hidden={this.state.searchbydateclieked}>
            <input
              type="text"
              onChange={this.namehndlechange}
              className="searchname"
              name="search"
              placeholder="Search.."
            />
            <button className="searchnamebtn">
              <i class="fa fa-search" />
            </button>
          </div>

          {this.state.searchbynameResults && (
            <div>
              {this.state.searchbynameResults.map(can => {
                //console.log(can.name+can.email+can.jobspec)
                return <Searchcard name={can.name} _id={can._id} />;
              })}
            </div>
          )}
        </div>
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>search by date</h2>
          <div>
            <Datepicker
              datechnage={this.getdatefromdatepicke}
              datereset={this.resetdatepicker}
            />

            <button
              disabled={!this.state.bothdatesselected}
              onClick={this.submitesearchbydate}
            >
              search{" "}
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Search;
