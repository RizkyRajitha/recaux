import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
//import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
//import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextField } from "formik-material-ui";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import jsonwebtoken from "jsonwebtoken";
//import Navbar from "../../components/navbar";
import "./login.css";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    flexGrow: 1
  },
  appbar: {
    flexGrow: 1,
    alignItems: "center",
    letterSpacing: 5,
    fontWeight: "bold"
  },
  loginpara: {
    alignItems: "center",
    letterSpacing: 5
  }
}));

const Formic = ({ errors, history, touched, isSubmitting }) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log("i am mounted .......");
    console.log(localStorage.getItem("userid"));

    var jwt = localStorage.getItem("jwt");

    try {
      var decode = jsonwebtoken.verify(jwt, "authdemo");

      console.log("decode jwt - " + JSON.stringify(decode));
      history.push("/dashboard");
    } catch (error) {
      console.log("is this error >>>>>>>>>>>>>>>");
      console.log(error);
    }
  }, []);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const [values, setValues] = React.useState({
    showPassword: false
  });

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            align="center"
            className={classes.appbar}
          >
            RECRUITMENT@AUXENTA
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <h1 className="sameera"> </h1>
      <br />
      <br />
      <div class="loader-login" hidden={!isSubmitting} />
      <Container component="main" maxWidth="xs">
        {errors.invalidcred && (
          <div class="alert alert-danger" role="alert">
            {errors.invalidcred}
          </div>
        )}
        {errors.invalidemail && (
          <div class="alert alert-danger" role="alert">
            {errors.invalidemail}
          </div>
        )}
        {errors.disabled_user && (
          <div class="alert alert-danger" role="alert">
            {errors.disabled_user}
          </div>
        )}
        <CssBaseline />

        <div style={{ "text-align": "center" }}>
          Welcome to RECRUITMENT @ AUXENTA . Login to continue
        </div>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login in
          </Typography>
          <Form className={classes.form}>
            {/* <form className={classes.form} noValidate> */}
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              //id="email"
              label="Email Address"
              //name="email"
              autoComplete="email"
              autoFocus
              name="email1"
              id="papa"
              type="text"
              //placeholder="Email"
              //class="form-control"
              component={TextField}
            />

            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              //id="password"
              autoComplete="current-password"
              type={values.showPassword ? "text" : "password"}
              name="password"
              //type="password"
              //placeholder="Password"
              //class="form-control"
              component={TextField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {/* <FormControlLabel
           control={<Checkbox value="remember" color="primary" />}
           label="Remember me"
         /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/fogotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item />
            </Grid>
            <div style={{ "text-align": "center" }}>
              If you are not registered please contact a administrator to get
              you started
            </div>
          </Form>
        </div>
        <Box mt={5} />
      </Container>
      <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
        <div class="container text-center">
          <small>Copyright RECRUITMENT@Auxenta &copy; </small>
        </div>
      </footer>
    </div>
  );
};

const Login = withFormik({
  mapPropsToValues({ email1, password }) {
    return {
      email1: email1 || "",
      password: password || ""
    };
  },

  handleSubmit(values, { props, setErrors, setSubmitting }) {
    console.log("submitted - - ");
    console.log(values);
    var params = new URLSearchParams();
    params.append("email", values.email1);
    params.append("password", values.password);
    // data: {
    //   email: this.state.email,
    //   password: this.state.password
    // }

    axios
      .post("/usr/login1", params)
      .then(data => {
        console.log("awe mewwa - - -popopopopo");
        console.log(data);
        var body = data.data;

        //invalid_email

        if (body === "invalid_email") {
          setErrors({ invalidemail: "invalid Email" });
          setSubmitting(false);
        } else if (body === "disabled_user") {
          setErrors({ disabled_user: "User Disabled , Please contact Admin" });
          setSubmitting(false);
        } else if (body === "invalid_password") {
          setErrors({ invalidcred: "invalid Creadentials" });
          setSubmitting(false);
        } else if (body) {
          console.log("body - " + body);
          localStorage.setItem("jwt", body.token);
          localStorage.setItem("usertype", body.usertype);
          localStorage.setItem("userId", body.userId);

          console.log(props);

          props.history.push("/dashboard");
          window.location.reload(false);
        }

        // if (body) {
        // console.log("body - " + body);
        // localStorage.setItem("jwt", body.token);
        // localStorage.setItem("usertype", body.usertype);
        // localStorage.setItem("userId", body.userId);

        // console.log(props);

        // if (data.data.usertype === "depthead") {
        //   props.history.push("/shortlist");
        //  // window.location.reload(false);
        // } else {
        //   props.history.push("/dashboard");
        //  // window.location.reload(false);
        // }
        // } else {
        // setErrors({ invalidcred: "invalid Creadentials" });
        // setSubmitting(false);
        // }
      })
      .catch(err => {
        console.log(err);
        setSubmitting(false);
      });
  },
  validationSchema: Yup.object().shape({
    email1: Yup.string()
      .email("Email must be a valid email")
      .required("Required"),
    password: Yup.string().required()
  })
})(Formic);

export default Login;

// import React, { useState, useEffect } from "react";
// import { withFormik, Form, Field } from "formik";
// import { Link } from "react-router-dom";
// import * as Yup from "yup";
// import axios from "axios";
// import jsonwebtoken from "jsonwebtoken";
// import Navbar from "../../components/navbar";
// import "./login.css";

// const Formic = ({ errors, history, touched, isSubmitting }) => {
//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     // Update the document title using the browser API
//     console.log("i am mounted .......");
//     console.log(localStorage.getItem("userid"));

//     var jwt = localStorage.getItem("jwt");

//     try {
//       var decode = jsonwebtoken.verify(jwt, "authdemo");

//       console.log("decode jwt - " + JSON.stringify(decode));
//       history.push("/dashboard");
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   return (
//     <div className="maindiv">
//       <div className="wrapper">
//         <div className="form-wrapper">
//           <div>
//             <br />

//             {errors.invalidcred && (
//               <div class="alert alert-danger" role="alert">
//                 {errors.invalidcred}
//               </div>
//             )}

//             {/*
// <Form>
//       {errors.invalidcred && <p>{errors.invalidcred} </p>}
//         <div className="row">
//           {console.log("errors " + JSON.stringify(errors.email1))}
//           <div class="input-field col s6 offset-s3">
//             {errors.email1 && <p>{errors.email1} </p>}
//             <Field name="email1" id="papa" type="email" placeholder="Email" />
//           </div>
//         </div>
//         <div className="row">
//         {errors.password && <p>{errors.password} </p>}
//           <div class="input-field col s6 offset-s3 ">
//             <Field name="password" type="password" placeholder="Password" />
//           </div>
//         </div>
//         <input type="submit" value="Go...." />
//       </Form> */}

//             <Form>
//               <br />
//               <br />
//               <br />
//               <div className="form-group">
//                 {/* <label> enter email </label> */}

//                 {touched.email1 && errors.email1 && <p>{errors.email1} </p>}
//                 <Field
//                   name="email1"
//                   id="papa"
//                   type="text"
//                   placeholder="Email"
//                   class="form-control"
//                 />
//               </div>
//               <div className="form-group">
//                 {/* <label> enter password </label> */}
//                 {touched.password && errors.password && (
//                   <p>{errors.password} </p>
//                 )}

//                 <Field
//                   name="password"
//                   type="password"
//                   placeholder="Password"
//                   class="form-control"
//                 />
//               </div>

//               <div className="submit">
//                 <input
//                   type="submit"
//                   className="btn btn-raised btn-primary"
//                   value="Login"
//                   id="submit"
//                   disabled={isSubmitting}
//                 />
//               </div>
//             </Form>
//             <br />
//             <br />

//             <div>
//               <Link to="/fogotpassword">
//                 <a>Forgotten password</a>
//               </Link>
//             </div>
//           </div>
//           <div />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Login = withFormik({
//   mapPropsToValues({ email1, password }) {
//     return {
//       email1: email1 || "",
//       password: password || ""
//     };
//   },

//   handleSubmit(values, { props, setErrors, setSubmitting }) {
//     console.log(values);
//     var params = new URLSearchParams();
//     params.append("email", values.email1);
//     params.append("password", values.password);
//     // data: {
//     //   email: this.state.email,
//     //   password: this.state.password
//     // }

//     axios
//       .post("/usr/login1", params)
//       .then(data => {
//         console.log("awe mewwa - - -popopopopo");
//         console.log(data);
//         var body = data.data;

//         if (body) {
//           console.log("body - " + body);
//           localStorage.setItem("jwt", body.token);
//           localStorage.setItem("usertype", body.usertype);
//           localStorage.setItem("userId", body.userId);

//           console.log(props);

//           if (data.data.usertype === "depthead") {
//             props.history.push("/shortlist");
//             window.location.reload(false);
//           } else {
//             props.history.push("/dashboard");
//             window.location.reload(false);
//           }
//         } else {
//           setErrors({ invalidcred: "invalid Creadentials" });
//           setSubmitting(false);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         setSubmitting(false);
//       });
//   },
//   validationSchema: Yup.object().shape({
//     email1: Yup.string()
//       .email()
//       .required("Required"),
//     password: Yup.string().required()
//   })
// })(Formic);

// export default Login;

// /**
//  *
//  *
//  *
//  import React from "react";
// import { withFormik, Form, Field } from "formik";
// import * as Yup from "yup";

// const Formic = ({ errors }) => {
//   return (
//     <div>
//       <Form>
//         <div className="row">
//           {console.log("errors " + errors.email1)}
//           <div class="input-field col s6 offset-s3">
//             {errors.email1 && <p>{errors.email1} </p>}
//             <Field name="email1" id="papa" type="email" placeholder="Email" />
//           </div>
//         </div>
//         <div className="row">
//         {errors.password && <p>{errors.password} </p>}
//           <div class="input-field col s6 offset-s3 ">
//             <Field name="password" type="password" placeholder="Password" />
//           </div>
//         </div>
//         <input type="submit" value="Go...." />
//       </Form>
//     </div>
//   );
// };

// const Formicktest = withFormik({
//   mapPropsToValues({ email1, password }) {
//     return {
//       email1: email1 || "",
//       password: password || ""
//     };
//   },

//   handleSubmit(values) {
//     console.log(values);
//   },
//   validationSchema: Yup.object().shape({
//     email1: Yup.string()
//       .email()
//       .required("Required"),
//     password: Yup.string()
//       .required()
//       .min(3)
//       .max(6)
//   })
// })(Formic);

// export default Formicktest;

//  */
