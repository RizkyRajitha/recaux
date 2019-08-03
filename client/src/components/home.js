import React from "react";
//import axios from 'axios'\

import "./spinner.css";
import io from "socket.io-client";

const drawerWidth = 240;
const drawerHeight = 960;

const socket = io();

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
      data : {data.msg}
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
      </div>
    </div>
  );
};

export default home;
