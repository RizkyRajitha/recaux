/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import jsonwebtoken from "jsonwebtoken";
//import {profileContext} from '../providers/profileProvides'
//Be sure to include styles at some point, probably during your bootstraping
//import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./sidenav.css";
const SidenavContext = () => {
  const [avatarUrl, setavatarUrl] = useState(false);
  const [id, setId] = useState(false);
  const [firstName, setfirstName] = useState(false);
  const [lastName, setlastName] = useState(false);
  const [usertype, setusertype] = useState(false);
  const [toggled, settoggled] = useState(false);
  const [loggedin, setloggedin] = useState(false);

  useEffect(() => {
    var jwt = localStorage.getItem("jwt");
    try {
      var decode = jsonwebtoken.verify(jwt, "authdemo");
      setloggedin(true);
      console.log("decode jwt - " + JSON.stringify(decode));
    } catch (error) {
      console.log(error);
      setloggedin(false);
      //this.props.history.push("/login");
    }

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
        setavatarUrl(baseUrl);
        setId(datain._id);
        setfirstName(datain.firstName);
        setlastName(datain.lastName);
        setusertype(datain.usertype);

        // this.setState({
        //   id: datain._id,
        //   firstName: datain.firstName,
        //   lastName: datain.lastName,
        //   usertype: datain.usertype
        // });
      })
      .catch(err => {});
  });

  if (loggedin) {
    return (
      
      <SideNav
        className="sidenavmain"
        onSelect={selected => {
          // Add your code here
          console.log("click - " + selected);
          if (selected === "home") {
            console.log("con - ");
            this.props.history.push("/dashboard");
          }

          if (selected === "user") {
            //var id = localStorage.getItem("userId");
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

          if (selected === "logout") {
            localStorage.removeItem("jwt");
            localStorage.removeItem("userId");
            localStorage.removeItem("usertype");
            this.props.history.push("/Login");
          }
        }}
        onToggle={state => {
          console.log("toggled + " + state);
          settoggled(state);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav>
          {toggled && (
            // <NavItem eventKey="user">
            //   <NavIcon className="sidenavAvatar">

            <div className="avatarsidenav">
              <img
                src={
                  this.props.avatarUrl
                    ? avatarUrl
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/220px-Emma_Watson_2013.jpg"
                }
              />
            </div>

            //   </NavIcon>
            // </NavItem>
          )}

          {toggled && (
            <div className="sidenavuserdetails">
              
              <ul className="sidenavuserdetails">
                <li> username : {firstName + " " + lastName}</li>
                <li> type : {usertype}</li>
              </ul>
            </div>
          )}

          <NavItem className={toggled && "avatar"} eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
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

          <NavItem eventKey="charts">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Charts</NavText>
            <NavItem eventKey="charts/linechart">
              <NavText>Line Chart</NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
              <NavText>Bar Chart</NavText>
            </NavItem>
          </NavItem>

          <NavItem
            className={
              toggled ? "logoutlinksidenavopen" : "logoutlinksidenavclosed"
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
};

export default withRouter(SidenavContext);
