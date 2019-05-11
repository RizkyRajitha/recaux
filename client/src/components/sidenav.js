/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
//import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./sidenav.css";
class TemporaryDrawer extends Component {
  render() {
    return (
      
        <SideNav className="sidenavmain"
          onSelect={selected => {
            // Add your code here
            console.log("click - " + selected);
            if (selected === "home") {
              this.props.history.push("/dashboard");
            }

            if (selected === "user") {
              var id = localStorage.getItem("userId");
              this.props.history.push("/user/" + id);
            }
            if (selected === "adduser") {
              this.props.history.push("/register");
            }

            if (selected === "shortlist") {
              this.props.history.push("/shortlist");
            }

            if (selected === "logout") {
              localStorage.removeItem('jwt')
              localStorage.removeItem('userId')
              this.props.history.push("/login");
            }
          }}
          ontoggle={state => {
            console.log("toggled + " + state);
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav>
            <NavItem eventKey="home">
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

            <NavItem className="logoutlinksidenav" eventKey="logout">
              <NavIcon>
                <i
                   class="fas fa-sign-out-alt"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Logout</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
     
    );
  }
}

export default withRouter(TemporaryDrawer);
