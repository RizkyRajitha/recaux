import React from "react";
//import axios from 'axios'\

//import "./spinner.css";
import Chip from "./skillChipsWithoutDeleye.js";

import "./home.css";
//import io from "socket.io-client";

const drawerWidth = 240;
const drawerHeight = 960;

// const socket = io();

const home = () => {
  const [data, setdata] = React.useState({});

  React.useEffect(() => {
    // socket.on("new_candidate", data => {
    //   console.log("awa");
    //   console.log(data);
    //   setdata(data);
    // });
  });

  return (
    <div>
      {/* data : {data.msg}
      <div class="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div> */}

      <div class="container">
        <div class="row my-2">
          <div class="col-lg-8 order-lg-2">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a
                  href=""
                  data-target="#profile"
                  data-toggle="tab"
                  class="nav-link active"
                >
                  Profile
                </a>
              </li>

              <li class="nav-item">
                <a
                  href=""
                  data-target="#edit"
                  data-toggle="tab"
                  class="nav-link"
                >
                  Edit
                </a>
              </li>

              <p className="rec"> Received: 2 Days Ago</p>
            </ul>
            <div class="tab-content py-4">
              <div class="tab-pane active" id="profile">
                {/* <h5 class="mb-3">User Profile</h5> */}
                <div class="row">
                  <div class="col-md-6">
                    <h6 class="h6colorcanview">Email</h6>
                    <p>sameera@gmail.com</p>
                    <h6 class="h6colorcanview"> Job Specification</h6>
                    <p>Quality assuarance Engineer</p>
                  </div>
                  <div class="col-md-6">
                    <h6 class="h6colorcanview">Skills</h6>

                    <Chip
                      currentskills={[
                        { key: 1, label: "HTML" },
                        { key: 2, label: "JavaScript" },
                        { key: 2, label: "Vue.js" },
                        { key: 1, label: "HTML" },
                        { key: 2, label: "JavaScript" },
                        { key: 2, label: "Vue.js" }
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div class="tab-pane" id="edit">
                <form role="form">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">
                      First name
                    </label>
                    <div class="col-lg-9">
                      <input class="form-control" type="text" value="Jane" />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">
                      Last name
                    </label>
                    <div class="col-lg-9">
                      <input class="form-control" type="text" value="Jane" />
                    </div>
                    <label class="col-lg-3 col-form-label form-control-label" />
                    <div class="col-lg-9">
                      <input
                        type="reset"
                        class="btn btn-secondary"
                        value="Cancel"
                      />
                      <input
                        type="button"
                        class="btn btn-primary"
                        value="Save Changes"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-4 order-lg-1 text-center">
            <img
              src="https://www.pinclipart.com/picdir/big/200-2008697_account-customer-login-man-user-icon-login-icon.png"
              style={{ width: 200, height: 200 }}
              class="mx-auto img-fluid img-circle d-block"
              alt="avatar"
            />
            <h3 class="mt-2">SAMEERA PRABHATH</h3>
            <div className="">
              <span className="badge badge-pill badge-danger">New</span>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <div class="threecol">
          <div class="col-md-12 xx">
            <table class="table table-borderless ssss">
              <tbody>
                <tr>
                  <td>
                    <h6 class="h6colorcanview">Assigned to</h6>
                  </td>
                  <td>angela jayathissa</td>
                </tr>
                <tr>
                  <td>Assigned by</td>
                  <td>kalani welagedara</td>
                </tr>
                <tr>
                  <td>shortlist</td>
                  <td>20 hours</td>
                </tr>
                <tr>
                  <td>allocated</td>
                  <td>2 days ago</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-md-12 xx">
            <table class="table table-borderless ssss">
              <tbody>
                <tr>
                  <td>
                    <h6 class="h6colorcanview">Assigned to</h6>
                  </td>
                  <td>angela jayathissa</td>
                </tr>
                <tr>
                  <td>Assigned by</td>
                  <td>kalani welagedara</td>
                </tr>
                <tr>
                  <td>shortlist</td>
                  <td>20 hours</td>
                </tr>
                <tr>
                  <td>allocated</td>
                  <td>2 days ago</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-md-12 xx">
            <table class="table table-borderless ">
              <tbody>
                <tr>
                  <td>
                    <h6 class="h6colorcanview">Assigned to</h6>
                  </td>
                  <td>angela jayathissa</td>
                </tr>
                <tr>
                  <td>Assigned by</td>
                  <td>kalani welagedara</td>
                </tr>
                <tr>
                  <td>shortlist</td>
                  <td>20 hours</td>
                </tr>
                <tr>
                  <td>allocated</td>
                  <td>2 days ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
