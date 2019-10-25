import React from "react";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
const Log = () => {
  const [data, setdata] = React.useState("");

  React.useEffect(() => {
    var jwt = localStorage.getItem("jwt");

    try {
      console.log("in register");
      var pay = jsonwebtoken.verify(jwt, "authdemo");
    } catch (error) {
      this.props.history.push("/Login");
    }

    var config = {
      headers: { authorization: jwt }
    };

    axios
      .get("/usr/log", config)
      .then(res => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div
        className=""
        style={{
          "white-space": "pre-wrap",
          "text-align": "left",
          "margin-left": "10%"
        }}
      >
        logger
        {data}
      </div>
    </div>
  );
};

export default Log;
