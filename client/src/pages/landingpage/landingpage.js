import React from "react";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "./landingpage.css";
import moment from "moment";

const drawerWidth = 240;
const drawerHeight = 960;

const LandingPage = props => {
  const [data, setdata] = React.useState({});
  const [greet, setgreet] = React.useState("");
  const [name, setname] = React.useState("");
  const [avatarUrl, setavatarUrl] = React.useState("");
  const [interviewdata, setinterviewdata] = React.useState([]);
  const [fromatinterviewdata, setfromatinterviewdata] = React.useState([]);
  const [intdates, setintdates] = React.useState([]);
  const [id, setid] = React.useState("");
  const [shortlists, setshortlists] = React.useState([]);

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
          setid(datain.id);
          console.log("user id");
          console.log(datain.id);

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
      .get("/usr/getshortlistdata/" + decode.id, config)
      .then(res => {
        console.log("short datakkkkkkkkkkkkkkkkkkkkkkkk");
        console.log(res.data);

        setshortlists(res.data);

        console.log("arr length - " + JSON.stringify(res.data));
      })
      .catch(err => {});

    axios
      .post("/usr/landingpage", { today: new Date().toISOString() }, config)
      .then(res => {
        console.log("interview data - - - ");

        console.log(res.data);

        var times = [];

        res.data.forEach(element => {
          var frpamtedtimes = {};
          var datehigh = moment(element.datetime).add(30, "minutes"); //.format("DD:HH:mm:ss", { trim: false });
          var datelow = moment(element.datetime).subtract(30, "minutes");

          // console.log("dolots");
          // console.log(datelow.toISOString());

          frpamtedtimes.from = datelow.format("HH:mm:ss", { trim: false }); //+ ":" + datelow.minutes();

          frpamtedtimes.to = datehigh.format("HH:mm:ss", { trim: false }); //.hours() + ":" + datehigh.minutes();
          frpamtedtimes.name = element.candidateName;
          // console.log("datetimes");
          // console.log(frpamtedtimes);
          times.push(frpamtedtimes);
        });
        setintdates(times.reverse());
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
      <div className="landingcontetdic">
        you have {interviewdata.length} Interview(s) Today
        <ul>
          {intdates.map(ele => {
            return (
              <li className="listinterivewslandingpage">
                {" "}
                with {ele.name + "  "}
                from {" " + ele.from + " "} to {" " + ele.to} <br />
              </li>
            );
          })}
          you have {shortlists.length === 0 ? " no " : "few"} shortlists(s)
          Pending
          {shortlists.map(ele => {
            return (
              <li className="listinterivewslandingpage">
                {ele.name + " "} is on Pending shortlists{" "}
                <a href={"/getcandidate/" + ele._id}>view</a>
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(LandingPage);
