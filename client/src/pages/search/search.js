import React, { Component } from "react";
import axios from "axios";
import Datepicker from "../../components/datepicker";
import Modal from "react-modal";
import Searchcard from "../../components/searchcard";
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
};

Modal.setAppElement("#root");
class Search extends Component {
  state = {
    modalIsOpen: "",
    date: null,
    bothdatesselected: false,
    searchbydateResults: null,
    searchbyname_value: "",
    searchbynameResults:null
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
        this.setState({searchbynameResults:res.data})
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
  }

  render() {
    return (
      <div>
        <button onClick={this.searchModal}>search by date</button>

        {this.state.searchbydateResults && (
          <div>
            {this.state.searchbydateResults.map(can => {
              //console.log(can.name+can.email+can.jobspec)
              return <Searchcard name={can.name} _id={can._id} />;
            })}
          </div>
        )}




        <input type="text" onChange={this.namehndlechange} />

        <button onClick={this.submitesearchbyname}>search by name</button>

        {this.state.searchbynameResults && (
          <div>
            {this.state.searchbynameResults.map(can => {
              //console.log(can.name+can.email+can.jobspec)
              return <Searchcard name={can.name} _id={can._id} />;
            })}
          </div>
        )}

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
