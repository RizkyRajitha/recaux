import React, { Component } from "react";
import Navbar from "../../components/navbarloogedin";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import Modal from "react-modal";
import "./user.css";

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
}

Modal.setAppElement("#root")

class Userprofile extends Component {
  state = {
    firstName: "",
    email: "",
    lastName: "",
    login: false,
    success: false,
    addedsucsess: 0,
    expat: new Date(),
    nullfielderr: false,
    userdata: {},
    file: null,
    url: null,
    id: ""
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

    console.log(this.props.match.params.id);

    axios
      .get("/usr/user/" + this.props.match.params.id)
      .then(res => {
        this.setState({ userdata: res.data });
        console.log(res);
        console.log("---------");
        console.log(this.state.userdata);
      })
      .catch(err => {
        console.log(err);
      });
  }

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
        console.log(result);
        this.setState({ url: result.data.url });
        //document.querySelector('.images').setAttribute('src',this.state.url)
      })
      .catch(err => {
        console.log('error - '+err)
      });
  };

  chngpss = e => {
    this.props.history.push("/changepass/" + this.props.match.params.id);
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


  imagehndle = e =>{
this.openModal()
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="maindivuser">
          <div className="row">
            <div className="col-sm" />
            <div className="col-sm">
              {this.state.success && (
                <div class="alert alert-success" role="alert">
                  updated successfully
                </div>
              )}

 
<input type='button' className="btn btn-primary" onClick={this.imagehndle} value = 'add image'/>
                
{this.state.userdata.avatarUrl && <img className="images" src={this.state.userdata.avatarUrl} />}
         


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

            aloha

            <form onSubmit={this.submitHndleimg}>
          <input type="file" name="avatar" onChange={this.chngehndlimg} />
          <input type="submit" value="submit" />
        </form>

            {this.state.url && <img className="images" src={this.state.url} />}
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


              <form onSubmit={this.btn1handler}>
                <br />
                <br />
                <br />
                <div className="form-group">
                <lable>First Name</lable>
                  <input
                    required
                    type="text"
                    name="firstName"
                    className="form-control"
                    onChange={this.chngehandlfname}
                    placeholder="enter first name"
                    id="firstName"
                    value={this.state.userdata.firstName}
                  />
                </div>

                <div className="form-group">
                <label>Last Name</label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    className="form-control"
                    onChange={this.chngehandllname}
                    placeholder="enter last name"
                    id="lastName"
                    value={this.state.userdata.lastName}
                  />
                </div>

                <div className="form-group">
                <label>Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="enter candidate email"
                    onChange={this.chngehandlemail}
                    id="email"
                    value={this.state.userdata.email}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary"
                  value="save edited details"
                />
              </form>
                <br/>
              <button className="btn btn-primary" onClick={this.chngpss}>
                change password
              </button>

              <br />
            </div>
            <div className="col-sm" />
          </div>
        </div>
      </div>
    );
  }
}

export default Userprofile;
