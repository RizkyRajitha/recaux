import React from "react";
import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ImportExport from "@material-ui/icons/ImportExport";
import Person from "@material-ui/icons/Person";
import CallReceived from "@material-ui/icons/CallReceived";
import PersonAdd from "@material-ui/icons/PersonAdd";
import BarChartIcon from "@material-ui/icons/BarChart";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import YoutubeSearchedFor from "@material-ui/icons/YoutubeSearchedFor";
import CardTravel from "@material-ui/icons/CardTravel";
import Settings from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import { withRouter } from "react-router-dom";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import "./sidenav_mat.css";
import io from "socket.io-client";

const drawerWidth = 240;
const drawerHeight = 960;
//let socket = "";

//do work

//socket = io();

const socket = io("http://127.0.0.1:3001", {
  transports: ["websocket"],
  upgrade: false
});

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24
    // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    marginBottom: 100,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    marginBottom: 100,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 0,
    width: "40%"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    position: "fixed",
    width: drawerWidth,
    height: drawerHeight,
    //top: 64,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    height: drawerHeight,
    // top: 64,
    position: "fixed",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  logoutButton: {
    marginLeft: 36
  },
  divcontnotify: {
    marginLeft: "75%"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [logedin, setlogedin] = React.useState(false);
  const [avatarUrl, setavatarUrl] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open2, setOpen2] = React.useState(false);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const usertype = localStorage.getItem("usertype");

  const [data, setdata] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClick2(event) {
    setAnchorEl2(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function handleClose2() {
    setAnchorEl2(null);
  }

  React.useEffect(() => {
    var jwt = localStorage.getItem("jwt");
    try {
      var decode = jsonwebtoken.verify(jwt, "authdemo");
      //this.setState({ loggedin: true });
      console.log("decode jwt in side nav - " + JSON.stringify(decode));
      setlogedin(true);
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
      setlogedin(false);
      //this.setState({ loggedin: false });
      //this.props.history.push("/login");
    }

    socket.on("new_interview", newitne => {
      console.log("awa");
      console.log(newitne);
      setdata(state => {
        return state.concat([newitne]);
      });

      console.log(data);
    });
  }, []);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (logedin) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="relative"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              className={classes.title}
            >
              RECRUITMENT@AUXENTA
            </Typography>

            <div className="divcontnotify">
              <IconButton color="inherit">
                <Badge badgeContent={data.length} color="secondary">
                  <NotificationsIcon
                    onClick={handleClick2}
                    style={{ width: 30, height: 30 }}
                  />
                </Badge>

                <Avatar
                  alt="Remy Sharp"
                  src={avatarUrl}
                  style={{ marginLeft: 48, width: 40, height: 40 }}
                  onClick={handleClick}
                  //className={classes.avatar}
                />

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
                >
                  {data.map(ele => {
                    return (
                      <MenuItem
                        onClick={() =>
                          props.history.push("/getcandidate/" + ele.candidateId)
                        }
                      >
                        {ele.dis}
                      </MenuItem>
                    );
                  })}
                </Menu>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      var id = localStorage.getItem("userId");
                      props.history.push("/user/" + id);
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("jwt");
                      localStorage.removeItem("userId");
                      localStorage.removeItem("usertype");
                      props.history.push("/login");
                      setlogedin(false);
                      //window.location.reload(false);
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>

                {/* <Button
                  className={classes.logoutButton}
                  color="inherit"
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("usertype");
                    props.history.push("/login");
                    window.location.reload(false);
                  }}
                >
                  Logout
                </Button> */}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>
              <ListItem
                button
                onClick={() => {
                  props.history.push("/dashboard");
                }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  var id = localStorage.getItem("userId");
                  props.history.push("/user/" + id); //props.history.push("/register");
                }}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  props.history.push("/register");
                }}
              >
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Add new User" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  props.history.push("/analytics");
                  window.location.reload(false);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  props.history.push("/shortlist");
                }}
              >
                <ListItemIcon>
                  <ImportExport />
                </ListItemIcon>
                <ListItemText primary="Shortlist" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  props.history.push("/search");
                }}
              >
                <ListItemIcon>
                  <YoutubeSearchedFor />
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  props.history.push("/interviews");
                }}
              >
                <ListItemIcon>
                  <CardTravel />
                </ListItemIcon>
                <ListItemText primary="Interviews" />
              </ListItem>
              {usertype === "admin" || usertype === "depthead" ? (
                <ListItem
                  button
                  onClick={() => {
                    props.history.push("/settings");
                  }}
                >
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              ) : (
                ""
              )}
              {usertype === "admin" || usertype === "hr_staff" ? (
                <ListItem
                  button
                  onClick={() => {
                    props.history.push("/userlist");
                  }}
                >
                  <ListItemIcon>
                    <SupervisedUserCircle />
                  </ListItemIcon>
                  <ListItemText primary="Userlist" />
                </ListItem>
              ) : (
                ""
              )}
              {/* <ListItem
                button
                onClick={() => {
                  localStorage.removeItem("jwt");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("usertype");
                  props.history.push("/login");
                  window.location.reload(false);
                }}
              >
                <ListItemIcon>
                  <CallReceived />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem> */}
            </div>
          </List>

          <Divider />
          {/* <List>
            <div>
              <ListSubheader inset>Saved reports</ListSubheader>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
              </ListItem>
            </div>
          </List> */}
        </Drawer>
      </div>
    );
  } else {
    return <div />;
  }
}
export default withRouter(Dashboard);
