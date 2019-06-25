import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import jsonwebtoken from "jsonwebtoken";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

//Be sure to include styles at some point, probably during your bootstraping
//import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./sidenav.css";
class TemporaryDrawer extends Component {
  state = {
    toggled: false,
    id: false,
    firstName: false,
    lastName: false,
    usertype: false,
    loggedin: false,
    avatarUrl: false
  };

  componentDidMount() {
    var jwt = localStorage.getItem("jwt");
    try {
      var decode = jsonwebtoken.verify(jwt, "authdemo");
      this.setState({ loggedin: true });
      console.log("decode jwt in side nav - " + JSON.stringify(decode));

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
          // this.setState({ avatarUrl: baseUrl });

          this.setState({
            id: datain._id,
            firstName: datain.firstName,
            lastName: datain.lastName,
            usertype: datain.usertype,
            avatarUrl: baseUrl
          });
        })
        .catch(err => {});
    } catch (error) {
      console.log(error);
      this.setState({ loggedin: false });
      //this.props.history.push("/login");
    }
  }

  render() {
    if (this.state.loggedin) {
      return (
        <SideNav
          className="sidenavmain"
          onSelect={selected => {
            // Add your code here
            console.log("click - " + selected);
            if (selected === "home") {
              this.props.history.push("/dashboard");
            }

            if (selected === "user") {
              var id = localStorage.getItem("userId");
              this.props.history.push("/user/" + id);
              window.location.reload(false);
            }
            if (selected === "adduser") {
              this.props.history.push("/register");
            }

            if (selected === "shortlist") {
              this.props.history.push("/shortlist");
            }

            if (selected === "search") {
              this.props.history.push("/search");
            }

            if (selected === "analytics") {
              this.props.history.push("/analytics");
            }

            if (selected === "logout") {
              localStorage.removeItem("jwt");
              localStorage.removeItem("userId");
              localStorage.removeItem("usertype");
              window.location.reload(false);
              //this.props.history.push("/login");
            }
          }}
          onToggle={state => {
            console.log("toggled + " + state);
            this.setState({ toggled: state });
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav>
            {this.state.toggled && (
              // <NavItem eventKey="user">
              //   <NavIcon className="sidenavAvatar">

              <div className="avatarsidenav">
                <img
                  src={
                    this.state.avatarUrl
                      ? this.state.avatarUrl
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/220px-Emma_Watson_2013.jpg"
                  }
                />
              </div>

              //   </NavIcon>
              // </NavItem>
            )}

            {this.state.toggled && (
              <div className="sidenavuserdetails">
                <ul className="sidenavuserdetails">
                  <li>
                    username :{this.state.firstName + " " + this.state.lastName}
                  </li>
                  <li> type : {this.state.usertype}</li>
                </ul>
              </div>
            )}

            <NavItem className={this.state.toggled && "avatar"} eventKey="home">
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>

            <NavItem eventKey="user">
              <NavIcon>
                <i class="fas fa-user" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>User</NavText>
            </NavItem>

            <NavItem eventKey="adduser">
              <NavIcon>
                <i class="fas fa-user-plus" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Register</NavText>
            </NavItem>

            <NavItem eventKey="shortlist">
              <NavIcon>
                <i
                  class="fas fa-angle-double-down"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>shortlist</NavText>
            </NavItem>

            <NavItem eventKey="search">
              <NavIcon>
                <i class="fas fa-search" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Search</NavText>
            </NavItem>

            <NavItem eventKey="analytics">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Analytics</NavText>
            </NavItem>

            <NavItem
              className={
                this.state.toggled
                  ? "logoutlinksidenavopen"
                  : "logoutlinksidenavclosed"
              }
              eventKey="logout"
            >
              <NavIcon>
                <i class="fas fa-sign-out-alt" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Logout</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      );
    } else {
      return <div />;
    }
  }
}

export default withRouter(TemporaryDrawer);
