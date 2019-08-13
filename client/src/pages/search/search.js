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
import RSelect from "react-select";
import "./search.css";
import moments from "moment";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

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
    date: null,
    showtable: false,
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
    searchnoresults: false,
    jobspeclist: [],
    selectedOption: {},
    selectedDate: new Date(),
    clearselectedDate2: false,
    seachrecievddat: "",
    searchprimarystatus: ""
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  handleDateChange = e => {
    console.log(e);
    this.setState({
      selectedDate: e,
      seachrecievddat: e._d,
      showtable: true
    });

    var payload = {};

    if (this.state.searchName) {
      payload.name = this.state.searchName;
    }

    if (this.state.searchjobspec) {
      payload.jobspec = this.state.searchjobspec;
    }
    if (this.state.searchemail) {
      payload.email = this.state.searchemail;
    }
    if (this.state.searchsource) {
      if (this.state.searchsource === "default") {
      } else {
        payload.source = this.state.searchsource;
      }
    }

    var dataeinter = e._d;
    payload.reciveddate = dataeinter.toISOString();

    if (this.state.searchprimarystatus) {
      payload.primarystatus = this.state.searchprimarystatus;
    }

    console.log("searcg query");
    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({
            searchnoresults: true
          });
          this.setState({
            searchresults: data.data
          });
        } else {
          this.setState({
            searchnoresults: false
          });
          this.setState({
            searchresults: data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

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
      headers: {
        authorization: token
      }
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
        this.setState({
          avatarUrl: baseUrl
        });

        this.setState({
          id: datain._id,
          firstName: datain.firstName,
          lastName: datain.lastName,
          usertype: datain.usertype
        });
      })
      .catch(err => {});

    axios
      .get("/usr/getjobspeclist", config)
      .then(data => {
        this.setState({
          jobspeclist: data.data.jobspeclist
        });
      })
      .catch(err => {});
  }

  handleChangemodalselect = opt => {
    console.log(opt);
    this.setState({
      searchjobspec: opt.label,
      selectedOption: opt,
      showtable: true
    });
    //e.preventDefault();

    var payload = {};

    if (this.state.searchName) {
      payload.name = this.state.searchName;
    }

    payload.jobspec = opt.label;

    if (this.state.searchemail) {
      payload.email = this.state.searchemail;
    }
    if (this.state.searchsource) {
      if (this.state.searchsource === "default") {
      } else {
        payload.source = this.state.searchsource;
      }
    }
    if (this.state.seachrecievddat) {
      var dataeinter = this.state.seachrecievddat;
      payload.reciveddate = dataeinter.toISOString();
    }
    if (this.state.searchprimarystatus) {
      payload.primarystatus = this.state.searchprimarystatus;
    }

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({
            searchnoresults: true
          });
          this.setState({
            searchresults: data.data
          });
        } else {
          this.setState({
            searchnoresults: false
          });
          this.setState({
            searchresults: data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchformsubmitsource = e => {
    e.preventDefault();

    this.setState({
      searchsource: e.target.value,
      showtable: true
    });

    var payload = {};

    if (this.state.searchName) {
      payload.name = this.state.searchName;
    }

    if (this.state.searchjobspec) {
      payload.jobspec = this.state.searchjobspec;
    }

    if (this.state.searchemail) {
      payload.email = this.state.searchemail;
    }

    payload.source = e.target.value;

    if (this.state.seachrecievddat) {
      var dataeinter = this.state.seachrecievddat;
      payload.reciveddate = dataeinter.toISOString();
    }
    if (this.state.searchprimarystatus) {
      payload.primarystatus = this.state.searchprimarystatus;
    }

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({
            searchnoresults: true
          });
          this.setState({
            searchresults: data.data
          });
        } else {
          this.setState({
            searchnoresults: false
          });
          this.setState({
            searchresults: data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchformsubmitname = e => {
    e.preventDefault();

    var payload = {};

    this.setState({
      searchName: e.target.value,
      showtable: true
    });

    payload.name = e.target.value;

    if (this.state.searchjobspec) {
      payload.jobspec = this.state.searchjobspec;
    }
    if (this.state.searchemail) {
      payload.email = this.state.searchemail;
    }
    if (this.state.searchsource) {
      if (this.state.searchsource === "default") {
        payload.source = "";
      } else {
        payload.source = this.state.searchsource;
      }
    }
    if (this.state.seachrecievddat) {
      var dataeinter = this.state.seachrecievddat;
      payload.reciveddate = dataeinter.toISOString();
    }
    if (this.state.searchprimarystatus) {
      payload.primarystatus = this.state.searchprimarystatus;
    }

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({
            searchnoresults: true
          });
          this.setState({
            searchresults: data.data
          });
        } else {
          this.setState({
            searchnoresults: false
          });
          this.setState({
            searchresults: data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchformsubmitemail = e => {
    e.preventDefault();

    this.setState({
      searchemail: e.target.value,
      showtable: true
    });

    var payload = {};

    if (this.state.searchName) {
      payload.name = this.state.searchName;
    }

    if (this.state.searchjobspec) {
      payload.jobspec = this.state.searchjobspec;
    }

    payload.email = e.target.value;

    if (this.state.searchsource) {
      if (this.state.searchsource === "default") {
        payload.source = "";
      } else {
        payload.source = this.state.searchsource;
      }
    }
    if (this.state.seachrecievddat) {
      var dataeinter = this.state.seachrecievddat;
      payload.reciveddate = dataeinter.toISOString();
    }
    if (this.state.searchprimarystatus) {
      payload.primarystatus = this.state.searchprimarystatus;
    }

    if (this.state.clearselectedDate2) {
      var dataeinter = moments(this.state.selectedDate2._d);
      payload.reciveddate = dataeinter.toISOString();
    }

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({
            searchnoresults: true
          });
          this.setState({
            searchresults: data.data
          });
        } else {
          this.setState({
            searchnoresults: false
          });
          this.setState({
            searchresults: data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //

  searchbyprimarystatus = e => {
    console.log("primayr status");
    console.log(e.target.value);
    this.setState({
      searchprimarystatus: e.target.value,
      showtable: true
    });

    var payload = {};

    if (this.state.searchName) {
      payload.name = this.state.searchName;
    }

    if (this.state.searchjobspec) {
      payload.jobspec = this.state.searchjobspec;
    }
    if (this.state.searchemail) {
      payload.email = this.state.searchemail;
    }
    if (this.state.searchsource) {
      if (this.state.searchsource === "default") {
        payload.source = "";
      } else {
        payload.source = this.state.searchsource;
      }
    }
    if (this.state.seachrecievddat) {
      var dataeinter = this.state.seachrecievddat;
      payload.reciveddate = dataeinter.toISOString();
    }

    payload.primarystatus = e.target.value;

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({
            searchnoresults: true
          });
          this.setState({
            searchresults: data.data
          });
        } else {
          this.setState({
            searchnoresults: false
          });
          this.setState({
            searchresults: data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchformsubmitrecieveddate = e => {
    //e.preventDefault();

    var dataeinter = moments(e._d);
    this.setState({
      showtable: true
    });

    var payload = {};

    if (this.state.searchName) {
      payload.name = this.state.searchName;
    }

    if (this.state.searchjobspec) {
      payload.jobspec = this.state.searchjobspec;
    }
    if (this.state.searchemail) {
      payload.email = this.state.searchemail;
    }
    if (this.state.searchsource) {
      if (this.state.searchsource === "default") {
        payload.source = "";
      } else {
        payload.source = this.state.searchsource;
      }
    }

    if (this.state.searchprimarystatus) {
      payload.primarystatus = this.state.searchprimarystatus;
    }

    payload.reciveddate = dataeinter.toISOString();

    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({
            searchnoresults: true
          });
          this.setState({
            searchresults: data.data
          });
        } else {
          this.setState({
            searchnoresults: false
          });
          this.setState({
            searchresults: data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  mainsearch = () => {
    var payload = {};

    if (this.state.searchName) {
      payload.name = this.state.searchName;
    }

    if (this.state.searchjobspec) {
      payload.jobspec = this.state.searchjobspec;
    }
    if (this.state.searchemail) {
      payload.email = this.state.searchemail;
    }
    if (this.state.searchsource) {
      if (this.state.searchsource === "default") {
        payload.source = "";
      } else {
        payload.source = this.state.searchsource;
      }
    }
    if (this.state.seachrecievddat) {
      var dataeinter = this.state.seachrecievddat;
      payload.reciveddate = dataeinter.toISOString();
    }
    if (this.state.searchprimarystatus) {
      payload.primarystatus = this.state.searchprimarystatus;
    }

    console.log("searcg query");
    console.log(payload);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .post("/usr/searchmany", payload, config)
      .then(data => {
        console.log(data);

        console.log("len - " + data.data.length);

        if (data.data.length === 0) {
          this.setState({
            searchnoresults: true
          });
          this.setState({
            searchresults: data.data
          });
        } else {
          this.setState({
            searchnoresults: false
          });
          this.setState({
            searchresults: data.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  clearinput = e => {
    e.preventDefault();
    this.setState({
      searchemail: "",
      searchName: "",
      searchjobspec: "",
      searchsource: "default",
      searchjobspec: "",
      seachrecievddat: "",
      selectedDate: new Date(),
      selectedOption: { label: "Select Job ", value: 0 },
      searchnoresults: false,
      searchresults: [],
      showtable: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="container">
          <form className={classes.root} autoComplete="off">
            <div className="form-row">
              <div class="form-group  col-md-4 ">
                <label for="exampleFormControlSelect9966">Candidate name</label>
                <input
                  id="exampleFormControlSelect9966"
                  class="form-control"
                  placeholder="Enter candidate name"
                  type="text"
                  value={this.state.searchName}
                  onChange={e => {
                    this.setState({
                      searchName: e.target.value
                    });
                    this.searchformsubmitname(e);
                  }}
                />
              </div>

              <div class="form-group  col-md-4 ">
                <label for="exampleFormControlSelect99">Candidate email</label>
                <input
                  id="exampleFormControlSelect99"
                  class="form-control"
                  placeholder="Enter candiate email"
                  type="text"
                  value={this.state.searchemail}
                  onChange={e => {
                    this.setState({
                      searchemail: e.target.value
                    });
                    this.searchformsubmitemail(e);
                  }}
                />
              </div>
              <div class="form-group col-md-4 ">
                <label for="exampleFormControlSelect1">Source</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  value={this.state.searchsource}
                  onChange={e => {
                    console.log(e.target.value);
                    this.setState({
                      searchsource: e.target.value
                    });
                    this.searchformsubmitsource(e);
                  }}
                >
                  <option value="default">Select one</option>
                  <option value="email"> Via email </option>
                  <option value="manual"> Via refereal </option>
                </select>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <label for="exampleFormControlSelect1">Job specification</label>
              <div className="">
                <RSelect
                  defaultValue={{ label: "Select Dept", value: 0 }}
                  value={this.state.selectedOption}
                  onChange={this.handleChangemodalselect}
                  options={this.state.jobspeclist}
                />{" "}
              </div>
            </div>
            <div class="form-group col-md-3 seachbtn ">
              <label for="exampleFormControlSelect14444">Recived date</label>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  id="exampleFormControlSelect14444"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  disableFuture={true}
                  className=""
                />{" "}
              </MuiPickersUtilsProvider>{" "}
            </div>
            <div class="form-group col-md-4 ">
              <label for="exampleFormControlSelect14444aaaa">
                Primary status
              </label>
              <select
                id="exampleFormControlSelect14444aaaa"
                class="form-control"
                onChange={this.searchbyprimarystatus}
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
            <button
              className="btn btn-primary mainseachbtn "
              type="Search"
              onClick={this.mainsearch}
            >
              <i class="fa fa-search" />
            </button>
            <button className="btn mainseachbtn " onClick={this.clearinput}>
              clear
              <i class="far fa-times-circle" />
            </button>
          </form>{" "}
        </div>

        <div className="container sarchdatadiv " hidden={!this.state.showtable}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {this.state.searchresults &&
                this.state.searchresults.map(can => {
                  // console.log(can.name + can.email + can.jobspec);
                  return (
                    <tr>
                      <th scope="row">{can.name}</th>
                      <td>
                        <a target="_blank" href={"/getcandidate/" + can._id}>
                          view
                        </a>
                        <br />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {this.state.searchnoresults && <p> no results found </p>}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Search);
