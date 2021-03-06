import React, { Component } from "react";
import Navbar from "../../components/navbar";
import Drawer from "../../components/sidenav";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import "./user.css";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

const customStyles = {
  content: {
    width: "50%",
    height: "45%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

class Userprofile extends Component {
  state = {
    email: "",
    login: false,
    success: false,
    addedsucsess: 0,
    expat: new Date(),
    nullfielderr: false,
    userdata: {},
    file: null,
    url: null,
    id: "",
    errfiletoolarge: false,
    unsupportedFormat: false,
    userowner: false,
    isLoading: false,
    isauthorizeduser: false
  };

  chngehndlimg = e => {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files);
    this.setState({ id: this.props.match.params.id });
  };

  chngehandlfname = e => {
    this.state.userdata.firstName = e.target.value;
    this.forceUpdate();
    console.log(this.state.userdata);
  };

  chngehandllname = e => {
    this.state.userdata.lastName = e.target.value;
    this.forceUpdate();
    console.log(this.state.userdata);
  };

  chngehandlemail = e => {
    this.state.userdata.email = e.target.value;
    this.forceUpdate();
    console.log(this.state.userdata);
  };

  componentDidMount() {
    const jwt = localStorage.getItem("jwt");
    console.log("jwt token -- - -- >>>" + jwt);

    var usertype = localStorage.getItem("usertype");
    if (usertype === "admin" || usertype === "hr_staff") {
      this.setState({ isauthorizeduser: true });
    }

    try {
      console.log("in register");
      var pay = jsonwebtoken.verify(jwt, "authdemo");
      console.log("payload - " + JSON.stringify(pay));
      console.log("************************************");
      console.log("id - params - " + this.props.match.params.id);
      if (!(this.props.match.params.id === pay.id)) {
        this.setState({ userowner: true });
      }
    } catch (error) {
      console.log("not logged in redirecting...............");

      //e.preventDefault();
      this.props.history.push("/Login");
    }

    console.log(this.props.match.params.id);

    axios
      .get("/usr/user/" + this.props.match.params.id)
      .then(res => {
        this.setState({ userdata: res.data });
        console.log(res);
        console.log("---------");
        console.log(this.state.userdata);

        var preurl = this.state.userdata.avatarUrl.slice(0, 48);
        var posturl = this.state.userdata.avatarUrl.slice(
          49,
          this.state.userdata.avatarUrl.length
        );
        var config = "/w_290,h_295,c_thumb/";

        var baseUrl = preurl + config + posturl;
        this.setState({ baseUrl: baseUrl });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deactivateuser = e => {
    console.log("ebuwa " + this.state.userdata.id);
    console.log(this.state);
    console.log(e.target.checked);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    this.state.userdata.state = !e.target.checked;
    this.forceUpdate();
    //this.setState({ state:  });

    var dto = { state: e.target.checked };

    axios
      .post("/usr/changeuserstate/" + this.state.userdata.id, dto, config)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  btn1handler = e => {
    e.preventDefault();

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var dto = {
      email: this.state.userdata.email,
      firstName: this.state.userdata.firstName,
      lastName: this.state.userdata.lastName
    };

    console.log("data edit" + dto.email);
    console.log("data edit" + dto.firstName);
    console.log("data edit" + dto.lastName);

    axios
      .post("/usr/edituser/" + this.state.userdata.id, dto, config)
      .then(response => {
        console.log("resonse came - -");
        console.log(response.data);
        this.setState({ sucsess: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ sucsess: false });
      });
  };

  submitHndleimg = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    console.log("hahah");
    console.log(this.props.match.params.id);

    const formdata = new FormData();
    formdata.append("avatar", this.state.file);
    //

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: jwt
      }
    };

    axios
      .post("/usr/avatar/" + this.state.id, formdata, config)
      .then(result => {
        console.log("resaaaal - ");
        console.log(result);
        this.setState({ url: result.data.url });

        var preurl = result.data.url.slice(0, 48);
        var posturl = result.data.url.slice(49, result.data.url.length);
        var config = "/w_250,h_250,c_thumb/";

        var baseUrl = preurl + config + posturl;
        this.setState({ baseUrl: baseUrl });
        this.setState({ isLoading: false });
        //document.querySelector('.images').setAttribute('src',this.state.url)
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

  chngpss = e => {
    this.props.history.push("/changepass/" + this.props.match.params.id);
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

  imagehndle = e => {
    this.openModal();
  };

  render() {
    //var baseUrl =   this.state.url
    // const useStyles = makeStyles({
    //   avatar: {
    //     margin: 10,
    //   },
    //   bigAvatar: {
    //     margin: 10,
    //     width: 60,
    //     height: 60,
    //   },
    // });

    // const classes = useStyles();

    return (
      <div>
        <div className="container">
          <Grid container justify="center" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={this.state.baseUrl}
              style={{ margin: 10, width: 200, height: 200 }}
            />
          </Grid>

          {this.state.success && (
            <div class="alert alert-success" role="alert">
              updated successfully
            </div>
          )}
          <div className="">
            <table id="userdetailstable" class="table table-borderless">
              <tbody className="cancardTable">
                <tr>
                  <th scope="row">Firstname</th>
                  <td>{this.state.userdata.firstName}</td>
                </tr>
                <tr>
                  <th scope="row">Lastname</th>
                  <td>{this.state.userdata.lastName}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{this.state.userdata.email}</td>
                </tr>

                <tr>
                  <th scope="row">User Type</th>
                  <td>{this.state.userdata.usertype}</td>
                </tr>

                <tr>
                  <th scope="row" />
                  <td />
                </tr>
              </tbody>
            </table>

            {/* 
              {this.state.userdata.avatarUrl && (
                <img
                  className="images"
                  src={this.state.baseUrl}
                  className="rounded-circle"
                />
              )} */}

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>
                Change Profile Image
              </h2>

              <div class="loader-userprofile" hidden={!this.state.isLoading} />

              <div class="input-field col s12">
                <p>{this.state.shortedcanarrnamelist}</p>

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
                <form onSubmit={this.btn1handler}>
                  <div className="row">
                    <div className="col">
                      <input
                        required
                        type="text"
                        name="firstName"
                        className="form-control"
                        onChange={this.chngehandlfname}
                        placeholder="enter first name"
                        id="firstName"
                        value={this.state.userdata.firstName}
                        disabled={true}
                      />
                    </div>

                    <div className="col">
                      <input
                        required
                        type="text"
                        name="lastName"
                        className="form-control"
                        onChange={this.chngehandllname}
                        placeholder="enter last name"
                        id="lastName"
                        value={this.state.userdata.lastName}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        required
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="enter candidate email"
                        onChange={this.chngehandlemail}
                        id="email"
                        value={this.state.userdata.email}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btsuserprofile btn-primary"
                    value="save edited details"
                  />
                </form>
                <form onSubmit={this.submitHndleimg}>
                  <input
                    type="file"
                    name="avatar"
                    onChange={this.chngehndlimg}
                  />
                  <input type="submit" value="submit" />
                </form>
                {this.state.url && (
                  <img src={this.state.baseUrl} className="rounded-circle" />
                )}
              </div>
            </Modal>

            <div className="row" id="usermainformdiv">
              <div className="col" />
            </div>
          </div>

          <div className="userprofilebtnsdiv">
            <label
              hidden={!this.state.isauthorizeduser}
              className="disableuserlable"
            >
              {" "}
              {this.state.userdata.state
                ? "Disable this User"
                : "User Disabled"}
            </label>
            <label class="switch" hidden={!this.state.isauthorizeduser}>
              <input
                type="checkbox"
                name="state"
                checked={!this.state.userdata.state}
                disabled={!this.state.isauthorizeduser || this.state.userowner}
                onChange={this.deactivateuser}
              />
              <span class="slider round" />
            </label>
            <br />
            <button
              className="btn btsuserprofile btn-primary"
              disabled={this.state.userowner}
              onClick={this.chngpss}
            >
              change password
            </button>
            <input
              disabled={this.state.userowner}
              type="button"
              className="btn btsuserprofile btn-primary"
              onClick={this.imagehndle}
              value="Edit profile"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Userprofile;
