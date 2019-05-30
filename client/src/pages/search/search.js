import React, { Component } from "react";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const jwt = require("jsonwebtoken");

class Search extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };
  handleChange = date => {
    console.log("start - " + date);

    this.setState({
      startDate: date,
    //   endDate:date
    });
  };

  handleChangeEnd = date => {
    console.log("end - " + date);

    this.setState({
      endDate: date
    });
  };

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />

        <DatePicker
          selected={this.state.startDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
        />

        {/* <input type="date" onChange={this.dateHnadler} /> */}
      </div>
    );
  }
}

export default Search;
