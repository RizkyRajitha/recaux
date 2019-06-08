import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";

import io from "socket.io-client";
import "./nav.css";

const Navbar = props => {
  const [loggedin, setloggedin] = useState(false);
  const [nortifications, setnortifications] = useState(true);
  const [nortification_new_can, setnortification_new_can] = useState(true);
  const [newcan_name, setnewcan_name] = useState(false);
  const [newcan_id, setnewcan_id] = useState(false);

  const socket = io("http://localhost:3001", {
    transports: ["websocket"],
    upgrade: false
  });

  socket.on("new_candidate", data => {
    console.log("from socket" + JSON.stringify(data));

    setnortifications(true);
    setnortification_new_can(true);
    setnewcan_id(data._id);
    setnewcan_name(data.name);
  });

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
  });

  const viewcan = () => {
    props.history.push("/getcandidate/" + newcan_id);
    setnortifications(false);
    setnortification_new_can(false);
    setnewcan_id(false);
    setnewcan_name(false);
  };

  const logoutHandler = e => {
    console.log("loggeeeeeeee");
    localStorage.removeItem("jwt");
    props.history.push("/login");
    window.location.reload(false);
  };

  if (loggedin) {
    return (
      <ul className="navbar-loggedin">
        <li className="navbar-items" id="navbartopnortify">
          <div class="dropdown">
            <span>Inbox</span>
            <span class="badge" />
            <div class="dropdown-content">
              <p>Hello Worldsdadddddddddddddddddddddddddddddddd!</p>
            </div>
          </div>
        </li>

        <li className="navbar-items" id="navbartoplogout">
          <a className="navbar-anchor" href="default.asp">
            logout
          </a>
        </li>

        {/* <li className="navbar-items">
          <a className="navbar-anchor" href="contact.asp">
            Contact
          </a>
        </li>
        <li className="navbar-items">
          <a className="navbar-anchor" href="about.asp">
            About
          </a>
        </li> */}
      </ul>
    );
  } else {
    return <div />;
  }
};

export default withRouter(Navbar);
