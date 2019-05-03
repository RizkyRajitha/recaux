import React from "react";
import { withRouter } from "react-router-dom";

const Navbar = props => {
  const logoutHandler = e => {
    console.log("loggeeeeeeee");
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");

    props.history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Rect@Aux
      </a>
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
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">
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
              register
            </a>
          </li>

          {/* <li className="nav-item">
            <a className="nav-link" href="/register">
              Register
            </a>
          </li> */}
        </ul>
        <button className="btn btn-outline-danger  " onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
