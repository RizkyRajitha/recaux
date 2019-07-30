import React, { Component } from "react";
import axios from "axios";
import Datepicker from "../../components/datepicker";
import Modal from "react-modal";
import Searchcard from "../../components/searchcard";
import Drawer from "../../components/sidenav";
import Navbar from "../../components/navbar";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import "./search.css";
const jwt = require("jsonwebtoken");

const useStyles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    width: 200
  },
  button: {
    margin: 10
  },
  formControl: {
    margin: 10,
    minWidth: 120
  },

  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

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
    searchbynameResults: null,
    id: null,
    firstName: "",
    lastName: "",
    greet: "",
    usertype: "",
    avatarUrl: false,
    searchbydateclieked: false,
    searchName: "",  
    searchemail: "",
    searchjobspec: "",
    searchsource: "",
    searchresults: [],
    searchnoresults: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
//5
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
//////////////////////////////////////////////////////////////////////////////////////////
  submitesearchbydate = () => {
    if (this.state.date.from && this.state.date.to) {
      const token = localStorage.getItem("jwt");

      this.setState({ searchbynameResults: [] });

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
        var posturl = res.data.avatarUrl.slice(49, res.data.avatarUrl.length);
        var config = "/w_290,h_295,c_thumb/";

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

  searchformsubmit = e => {
    e.preventDefault();
    var payload = {
      name: this.state.searchName,
      email: this.state.searchemail,
      jobspec: this.state.searchjobspec,
      source: this.state.searchsource
    };

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({ searchnoresults: true });
          this.setState({ searchresults: data.data });
        } else {
          this.setState({ searchnoresults: false });
          this.setState({ searchresults: data.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchformsubmitsource = e => {
    e.preventDefault();
    var payload = {
      name: this.state.searchName,
      email: this.state.searchemail,
      jobspec: this.state.searchjobspec,
      source: e.target.value
    };

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({ searchnoresults: true });
          this.setState({ searchresults: data.data });
        } else {
          this.setState({ searchnoresults: false });
          this.setState({ searchresults: data.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchformsubmitname = e => {
    e.preventDefault();
    var payload = {
      name: e.target.value,
      email: this.state.searchemail,
      jobspec: this.state.searchjobspec,
      source: this.state.searchsource
    };

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({ searchnoresults: true });
          this.setState({ searchresults: data.data });
        } else {
          this.setState({ searchnoresults: false });
          this.setState({ searchresults: data.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchformsubmitemail = e => {
    e.preventDefault();
    var payload = {
      name: this.state.searchemail,
      email: e.target.value,
      jobspec: this.state.searchjobspec,
      source: this.state.searchsource
    };

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({ searchnoresults: true });
          this.setState({ searchresults: data.data });
        } else {
          this.setState({ searchnoresults: false });
          this.setState({ searchresults: data.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <Navbar />
        <Drawer
          avatarUrl={this.state.avatarUrl}
          username={this.state.firstName + " " + this.state.lastName}
          type={this.state.usertype}
        /> */}
{/* 
        <button
          id="searchbydatebtn"
          className="btn btn-primary"
          onClick={this.searchModal}
        >
          search by date
        </button> */}

        <div className="searchParamsdiv">
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={this.searchformsubmit}
          >
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              //value={"ciao"}
              onChange={e => {
                this.setState({ searchName: e.target.value });
                this.searchformsubmitname(e);
              }}
              margin="normal"
            />
            <TextField
              id="standard-uncontrolled"
              label="email"
              className={classes.textField}
              onChange={e => {
                this.setState({ searchemail: e.target.value });
                this.searchformsubmitemail(e);
              }}
              margin="normal"
            />

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="searchsource">source</InputLabel>
              <Select
                value={this.state.searchsource}
                onChange={e => {
                  console.log(e.target.value);
                  this.setState({ searchsource: e.target.value });
                  this.searchformsubmitsource(e);
                }}
                inputProps={{
                  name: "source",
                  id: "searchsource"
                }}
              >
                <MenuItem value={"email"}>Via email</MenuItem>
                <MenuItem value={"manual"}>Via refereal</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Job spec</InputLabel>
              <Select
                value={this.state.searchjobspec}
                onChange={e => {
                  //  console.log(e.target.value);
                  this.setState({ searchjobspec: e.target.value });
                }}
                inputProps={{
                  name: "age",
                  id: "age-simple"
                }}
              >
                <MenuItem value={"CEO"}>CEO</MenuItem>
                <MenuItem value={"HR"}>Human resource</MenuItem>
                <MenuItem value={"TECH_LEAD"}>leader</MenuItem>
              </Select>
            </FormControl>

           
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              //onClick={}
            >
              <i class="fa fa-search" />
            </Button>
          </form>
        </div>

        <div className="searchcontainer">
          {/* <div>
            <input
              type="text"
              // onChange={this.namehndlechange}
              // className="searchname"
              name="search"
              placeholder="Search.."
            />
            <input type="radio" name="source" value="email" /> via email
            <input type="radio" name="source" value="manual" /> via manual
            <Datepicker
              datechnage={this.getdatefromdatepicke}
              datereset={this.resetdatepicker}
            />
            jobspec add
          </div> */}

          {this.state.searchresults && (
            <div>
              {this.state.searchresults &&
                this.state.searchresults.map(can => {
                  //console.log(can.name+can.email+can.jobspec)
                  return <Searchcard name={can.name} _id={can._id} />;
                })}
            </div>
          )}

          {this.state.searchnoresults && <p> no results found </p>}
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

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Search);
