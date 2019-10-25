import React, { Component } from "react";
//import "./pdftest.css";
import { Document, Page, pdfjs } from "react-pdf";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

var exp = "";
export default class Pdf extends Component {
  state = { numPages: null, pageNumber: 1, isopen: true };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    return (
      <div className="container">
        {/* <div class="btn-group">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon
              class="btn  dropdown-toggle"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => {
                console.log("arrrrrrrrrrrrrrr");
                this.setState({ isopen: !this.state.isopen });
              }}
              style={{ width: 30, height: 30 }}
            />
          </Badge>
        </div> */}

        <div class="dropdown">
          <NotificationsIcon
            class="btn  dropdown-toggle"
            // type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          /><span class="badge badge-light">9</span>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>
      </div>
    );
  }
}
