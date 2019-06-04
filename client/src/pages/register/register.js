import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import "./register.css";
import Drawer from "../../components/sidenav";
import Navbar from "../../components/navbar";

var strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const Formic = ({ errors, history, touched, isSubmitting }) => {
  const [avatarUrl, setavatarUrl] = useState(false);
  const [id, setId] = useState(false);
  const [firstName, setfirstName] = useState(false);
  const [lastName, setlastName] = useState(false);
  const [usertype, setusertype] = useState(false);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log("i am mounted .......");
    console.log(localStorage.getItem("userid"));

    var jwt = localStorage.getItem("jwt");

    try {
      var decode = jsonwebtoken.verify(jwt, "authdemo");

      console.log("decode jwt - " + JSON.stringify(decode));
    } catch (error) {
      console.log(error);
      history.push("/dashboard");
    }

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
        var config = "/w_220,h_295,c_thumb/";

        var baseUrl = preurl + config + posturl;
        // this.setState({ avatarUrl: baseUrl });
        setavatarUrl(baseUrl);
        setId(datain._id);
        setfirstName(datain.firstName);
        setlastName(datain.lastName);
        setusertype(datain.usertype);

        this.setState({
          id: datain._id,
          firstName: datain.firstName,
          lastName: datain.lastName,
          usertype: datain.usertype
        });
      })
      .catch(err => {});
  });

  return (
    <div>
      <Navbar />

      <Drawer
        avatarUrl={avatarUrl}
        username={firstName + " " + lastName}
        type={usertype}
      />

      <div className="maindiv">
        <div className="wrapper">
          <div className="form-wrapper">
            <div>
              <h2> Add new user </h2>

              {errors.invalidcred && (
                <div class="alert alert-danger" role="alert">
                  {errors.invalidcred}
                </div>
              )}

              {console.log("errors - " + JSON.stringify(errors))}

              {errors.sucsess && (
                <div class="alert alert-success" role="alert">
                  User added successfully
                </div>
              )}

              {errors.noPrev && (
                <div class="alert alert-danger" role="alert">
                  Error: Access denied. please contact Administrator
                </div>
              )}

              {errors.duplicateemalifound && (
                <div class="alert alert-danger" role="alert">
                  Error: Duplicate email found. please contact Administrator
                </div>
              )}

              {errors.session_exp && (
                <div class="alert alert-danger" role="alert">
                  Error: Session Expired. please Login
                </div>
              )}

              {/* //session_exp
<Form>
      {errors.invalidcred && <p>{errors.invalidcred} </p>}
        <div className="row">
          {console.log("errors " + JSON.stringify(errors.email1))}
          <div class="input-field col s6 offset-s3">
            {errors.email1 && <p>{errors.email1} </p>}
            <Field name="email1" id="papa" type="email" placeholder="Email" />
          </div>
        </div>
        <div className="row">
        {errors.password && <p>{errors.password} </p>}
          <div class="input-field col s6 offset-s3 ">
            <Field name="password" type="password" placeholder="Password" />
          </div>
        </div>
        <input type="submit" value="Go...." />
      </Form> */}

              <Form>
                <br />
                <br />
                <br />
                <div className="form-group">
                  {/* <label> enter email </label> */}

                  {touched.email1 && errors.email1 && <p>{errors.email1} </p>}
                  <Field
                    name="email1"
                    type="text"
                    placeholder="Email"
                    class="form-control"
                  />
                </div>

                <div className="form-group">
                  {/* <label> enter email </label> */}

                  {touched.firstName && errors.firstName && (
                    <p>{errors.firstName} </p>
                  )}
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    class="form-control"
                  />
                </div>

                <div className="form-group">
                  {/* <label> enter email </label> */}

                  {touched.lastName && errors.lastName && (
                    <p>{errors.lastName} </p>
                  )}
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    class="form-control"
                  />
                </div>

                <div className="form-group">
                  {/* <label> enter email </label> */}
                  {errors.password1 && console.log(errors.password1)}
                  {touched.password1 && errors.password1 && (
                    <p>{errors.password1} </p>
                  )}
                  <Field
                    name="password1"
                    type="text"
                    placeholder="Enter Password"
                    class="form-control"
                  />
                </div>

                <div className="form-group">
                  {/* <label> enter email </label> */}

                  {touched.password2 && errors.password2 && (
                    <p>{errors.password2} </p>
                  )}
                  <Field
                    name="password2"
                    type="text"
                    placeholder="Re enter Passwird"
                    class="form-control"
                  />
                </div>

                <div className="form-group">
                  {/* <label> enter email </label> */}

                  {touched.usertype && errors.usertype && (
                    <p>{errors.usertype} </p>
                  )}
                  <Field
                    name="usertype"
                    component="select"
                    required
                    placeholder="Re enter Passwird"
                    class="form-control"
                  >
                    <option value="default">Select one</option>
                    <option value="hr_staff">HR staff</option>
                    <option value="depthead">Department head</option>{" "}
                    <option value="admin">Admin</option>
                  </Field>
                </div>

                <div className="submit">
                  <input
                    type="submit"
                    className="btn btn-raised btn-primary"
                    value="Add user"
                    id="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
              <br />
              <br />
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = withFormik({
  mapPropsToValues({
    email1,
    password1,
    password2,
    firstName,
    lastName,
    usertype
  }) {
    return {
      email1: email1 || "",
      password1: password1 || "",
      firstName: firstName || "",
      lastName: lastName || "",
      password2: password2 || "",
      usertype: usertype || "default"
    };
  },

  handleSubmit(values, { props, setErrors, setSubmitting }) {
    console.log("ebuwa - " + JSON.stringify(values));
    var params = new URLSearchParams();
    params.append("email", values.email1);
    params.append("password", values.password);
    setSubmitting(false);

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: { authorization: jwt }
    };

    var payload = {
      email: values.email1,
      password: values.password1,
      firstname: values.firstName,
      lastname: values.lastName,
      usertype: values.usertype
    };

    console.log("payload - " + JSON.stringify(payload));

    axios
      .post("/usr/reg", payload, config)
      .then(response => {
        console.log("resonse came - -");
        console.log(response.data);
        setErrors({ sucsess: true });
        setTimeout(() => {
          props.history.push("/dashboard");
        }, 10000);
        //localStorage.setItem("jwt", response.data);
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data == 11000);

        if (err.response.data == 11000) {
          setErrors({ duplicateemalifound: true });
        }

        if (err.response.data == "no_previladges") {
          //this.setState({ noPrev: true });
          setErrors({ noPrev: true });
          setTimeout(() => {
            props.history.push("/dashboard");
          }, 5000);

          //document.querySelectorAll('.form-group').value=''
        }

        if (err.response.data == "session_exp") {
          //this.setState({ noPrev: true });
          setErrors({ session_exp: true });
          setTimeout(() => {
            props.history.push("/login");
          }, 5000);
        }

        //if(err)
      });

    // data: {
    //   email: this.state.email,
    //   password: this.state.password
    // }

    // axios
    //   .post("/usr/login1", params)
    //   .then(data => {
    //     console.log("awe mewwa - - -popopopopo");
    //     console.log(data);
    //     var body = data.data;

    //     if (body) {
    //       console.log("body - " + body);
    //       localStorage.setItem("jwt", body);
    //       console.log(props);
    //       props.history.push("/dashboard");
    //     } else {
    //       setErrors({ invalidcred: "invalid Creadentials" });
    //       setSubmitting(false)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setSubmitting(false)
    //   });
  },
  validationSchema: Yup.object().shape({
    email1: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required"),
    password1: Yup.string()
      .required("Password is required")
      .min(3, "Must contain at least 8 characters"),
    // .matches(strongRegex, "Password is weak"),
    password2: Yup.string()
      .required("Please confirm the password")
      .oneOf([Yup.ref("password1"), null], "Passwords do not match"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Must contain at least 2 characters")
      .max(40, "Last name cannot exceed 40 characters"),
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Must contain at least 2 characters")
      .max(40, "First name cannot exceed 40 characters"),
    usertype: Yup.string().oneOf(
      ["hr_staff", "depthead", "admin"],
      "please select type"
    )
  })
})(Formic);

export default Login;

//var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
//var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

/**
 * 
 * 
 * 
 import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const Formic = ({ errors }) => {
  return (
    <div>
      <Form>
        <div className="row">
          {console.log("errors " + errors.email1)}
          <div class="input-field col s6 offset-s3">
            {errors.email1 && <p>{errors.email1} </p>}
            <Field name="email1" id="papa" type="email" placeholder="Email" />
          </div>
        </div>
        <div className="row">
        {errors.password && <p>{errors.password} </p>}
          <div class="input-field col s6 offset-s3 ">
            <Field name="password" type="password" placeholder="Password" />
          </div>
        </div>
        <input type="submit" value="Go...." />
      </Form>
    </div>
  );
};

const Formicktest = withFormik({
  mapPropsToValues({ email1, password }) {
    return {
      email1: email1 || "",
      password: password || ""
    };
  },

  handleSubmit(values) {
    console.log(values);
  },
  validationSchema: Yup.object().shape({
    email1: Yup.string()
      .email()
      .required("Required"),
    password: Yup.string()
      .required()
      .min(3)
      .max(6)
  })
})(Formic);

export default Formicktest;



 */

// import React, { Component } from "react";
// import jsonwebtoken from "jsonwebtoken";
// import { Redirect } from "react-router-dom";
// import Navbar from '../../components/navbar'
// import axios from "axios";

// class Register extends Component {
//   state = {
//     email: "",
//     registered: false,
//     password1: "",
//     password2: "",
//     firstname: "",
//     lastname: "",
//     usertype:"",
//     errorpassmatch:false,
//     duplicateemalifound:false,
//     noPrev:false
//   };

//   changeHandler = e => {
//     this.setState({
//       [e.target.id]: e.target.value
//     });

//     console.log(this.state)
//   };

//   // changeHandlerPassword = e => {
//   //   console.log(
//   //     `ps1 ${this.state}  ps2 ${e.target.value} +++ ${this.state.passsword !=
//   //       e.target.value}`
//   //   );

//   //   if (this.state.passsword !== String(e.target.value).trim) {
//   //     console.log(
//   //       "no match " + this.state.password + "  " + e.target.value + "-"
//   //     );
//   //     document.querySelector(".psscheck").innerHTML = "password dont match ";
//   //   } else {
//   //     // this.setState({
//   //     //   password2: e.target.value
//   //     // });
//   //     console.log("match");
//   //     document.querySelector(".psscheck").innerHTML = "password  match ";
//   //   }
//   // };

//   componentDidMount() {
//     const jwt = localStorage.getItem("jwt");
//     console.log('jwt token -- - -- >>>'+jwt);

//     try {
//       console.log("in register");
//       var pay = jsonwebtoken.verify(jwt, "authdemo");
//       console.log('payload - '+pay);
//       console.log('************************************' )

//     } catch (error) {
//       console.log("not logged in redirecting...............");

//       //e.preventDefault();
//       this.props.history.push("/Login");
//     }
//   }

//   submitHandler = e => {
//     e.preventDefault();
//     console.log(this.state);

// var jwt = localStorage.getItem("jwt");

// var config = {
//   headers: { authorization: jwt }
// };

// const passmatch = this.state.password1===this.state.password2

// console.log(passmatch)

// if(passmatch){
//   this.setState({
//     errorpassmatch:false
//     })
//   axios
//   .post(
//     "/usr/reg",
//     {
//       email: this.state.email,
//       password: this.state.password1,
//       firstname: this.state.firstname,
//       lastname: this.state.lastname,
//       usertype:this.state.usertype
//     },
//     config
//   )
//   .then(response => {
//     console.log("resonse came - -");
//     console.log(response.data);
//     this.setState({ registered: true });
//     //localStorage.setItem("jwt", response.data);
//   })
//   .catch(err => {
//     console.log(err);
//     console.log(err.response.data==11000);

//     if(err.response.data==11000){
//         this.setState({duplicateemalifound:true})
//         document.querySelectorAll('.form-group').value=''
//     }

//     if(err.response.data=='no_previladges'){
//       this.setState({noPrev:true})

//       setTimeout(()=>{
//         this.props.history.push("/dashboard");
//       },5000)

//       //document.querySelectorAll('.form-group').value=''
//   }
//     //if(err)
//   });
//     }
//     else{

//       this.setState({ errorpassmatch:true })
//     }

//   };

//   chngehandlsel =e=>{

//     this.setState({usertype:e.target.value})

//   }

//   render() {
//     if (this.state.registered === false) {
//       return (
//         <div >
//         <Navbar/>
//           <div class="row">
//             <div class="col-sm" />
//             <div class="col-sm">
//               <form onSubmit={this.submitHandler}>

//                 <br></br>
//                 <br></br>

//                 {this.state.errorpassmatch && (<div class="alert alert-warning" role="alert">
//   password does not match
// </div>)}
// {this.state.duplicateemalifound && (<div class="alert alert-warning" role="alert">
// Duplicate email Found
// </div>)}
// {this.state.noPrev && (<div class="alert alert-warning" role="alert">
// You have no Previladges to add new users, please contact your Administrator
// </div>)}
//                 <div class="form-group">
//                   <input
//                     required
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     onChange={this.changeHandler}
//                     placeholder="enter email"
//                   />
//                 </div>

//                 <div class="form-group">
//                   <input
//                     required
//                     type="text"
//                     className="form-control"
//                     id="firstname"
//                     onChange={this.changeHandler}
//                     placeholder="enter firstname"
//                   />
//                 </div>

//                 <div class="form-group">
//                   <input
//                     required
//                     type="text"
//                     className="form-control"
//                     id="lastname"
//                     onChange={this.changeHandler}
//                     placeholder="enter lastname"
//                   />
//                 </div>

//                 <div class="form-group">

//                   <input
//                     required
//                     type="password"
//                     id="password1"
//                     placeholder="enter password"
//                     className="form-control"
//                     onChange={this.changeHandler}
//                   />
//                 </div>

//                 <div class="form-group">

//                   <input
//                     required
//                     type="password"
//                     className="form-control"
//                     id="password2"
//                     placeholder="re enter password"
//                     onChange={this.changeHandler}
//                   />
//                 </div>

//                 <div class="form-group">
//             <label for="exampleFormControlSelect2">
//               select user type
//             </label>
//             <select
//               class="form-control"
//               id="status"
//               onChange={this.chngehandlsel}
//             >
//               <option selected>Select...</option>
//               <option id="status" value="hr_staff">
//                 HR staff
//               </option>
//               <option id="status" value="depthead">
//                 Department head
//               </option>
//               <option id="status" value="admin">
//                 Admin
//               </option>

//             </select>
//           </div>

//                 {/* <div class="form-group">
//                   <label>re enter password</label>
//                   <input
//                     type="password"
//                     id="password2"
//                     placeholder="enter password again"
//                     onChange={this.changeHandlerPassword}
//                     className="form-control"
//                   />
//                   <label className="psscheck" />
//                 </div> */}
//                 <input type="submit" class="btn btn-primary" value="Add User" />
//               </form>
//             </div>
//             <div class="col-sm" />
//           </div>
//         </div>
//       );
//     } else {
//       return <Redirect to={"/dashboard"} />;
//     }
//   }
// }

// export default Register;
