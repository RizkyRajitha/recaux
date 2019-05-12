import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./nav.css";

const Navbar = props => {
  const logoutHandler = e => {
    console.log("loggeeeeeeee");
    localStorage.removeItem("jwt");

    props.history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          {/* <li className="nav-item">
            <a id='navdashbordlink' className="nav-link" href="/dashboard">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/shortlist">
              Shortlist
            </a>
          </li> */}
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">
                Action
              </a>
              <a class="dropdown-item" href="#">
                Another action
              </a>
              <div class="dropdown-divider" />
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
        <button
          id="logoutbtn"
          className="btn btn-outline-danger my-2 my-sm-0 "
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
