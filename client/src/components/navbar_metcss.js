import React from "react";
import { withRouter } from "react-router-dom";
require("./nav.css");

const Navbar = props => {
  const logoutHandler = e => {
    console.log("loggeeeeeeee");
    localStorage.removeItem("jwt");

    props.history.push("/login");
  };

  return (
    <nav>
      <div id="nav" className="nav-wrapper grey darken-3">
        <a href="/" id="navlogo" class="brand-logo left">
          Rect@Aux
        </a>

        <ul id="nav-mobile" class="right hide-on-med-and-down ">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">register</a>
          </li>
          <li>
            <a onClick={logoutHandler}>logout</a>
            {/* <button className="  waves-effect waves-light btn-small left  red accent-4 " onClick={logoutHandler}>
          Logout
        </button> */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
