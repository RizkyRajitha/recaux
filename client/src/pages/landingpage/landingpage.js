import React from "react";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "./landingpage.css";

const drawerWidth = 240;
const drawerHeight = 960;

const LandingPage = props => {
  const [data, setdata] = React.useState({});
  const [greet, setgreet] = React.useState("");
  const [name, setname] = React.useState("");
  const [avatarUrl, setavatarUrl] = React.useState("");
  const [interviewdata, setinterviewdata] = React.useState("");
  const [fromatinterviewdata, setfromatinterviewdata] = React.useState([]);

  React.useEffect(() => {
    var hours = new Date().hours;

    if (hours > 12) {
      setgreet("Good Afternoon ");
    } else {
      setgreet("Good Morning ");
    }

    var jwt = localStorage.getItem("jwt");
    try {
      var decode = jsonwebtoken.verify(jwt, "authdemo");
      //this.setState({ loggedin: true });
      console.log("decode jwt in side nav - " + JSON.stringify(decode));

      var config = {
        headers: { authorization: jwt }
      };

      axios
        .get("/usr/basicuserdetails", config)
        .then(res => {
          console.log(res.data);
          var datain = res.data;

          var preurl = res.data.avatarUrl.slice(0, 48);
          var posturl = res.data.avatarUrl.slice(49, res.data.avatarUrl.length);
          var config = "/w_290,h_295,c_thumb/";

          var baseUrl = preurl + config + posturl;
          // this.setState({ avatarUrl: baseUrl });
          setavatarUrl(baseUrl);
          setname(datain.firstName + " " + datain.lastName);
          // this.setState({
          //   id: datain._id,
          //   firstName: datain.firstName,
          //   lastName: datain.lastName,
          //   usertype: datain.usertype,
          //   avatarUrl: baseUrl
          // });
        })
        .catch(err => {});
    } catch (error) {
      console.log(error);
      props.history.push("/login");
      //setlogedin(false);
      //this.setState({ loggedin: false });
      //this.props.history.push("/login");
    }

    axios
      .get("/usr/interviews", config)
      .then(res => {
        console.log("interview data - - - ");

        //console.log(data.data)

        // setfromatinterviewdata(state=>{

        //     res.data.forEach(element => {

        //     });

        // })

        setinterviewdata(res.data);
      })
      .catch(err => {
        console.log(err);
        //this.setState({ isLoading: false });
      });
  }, []);

  return (
    <div>
      {" "}
      <span className="spanlandingpagegreet"> {greet + name + "!"} </span>
      <div className="avatardivlandingpage">
        <Avatar
          alt="Remy Sharp"
          src={avatarUrl}
          style={{ marginLeft: 0, width: 300, height: 300 }}
          //onClick={handleClick}
          // className={classes.avatar}
        />
      </div>
      you have {interviewdata.length} Today
    </div>
  );
};

export default withRouter(LandingPage);
