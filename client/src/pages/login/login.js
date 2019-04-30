import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import "./login.css";

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
      console.log(error);
    }
  });

  return (
    <div className="maindiv">
      <div className="wrapper">
        <div className="form-wrapper">
          <div>
            <br />

            {errors.invalidcred && (
              <div class="alert alert-danger" role="alert">
                {errors.invalidcred}
              </div>
            )}

            {/* 
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
                  id="papa"
                  type="text"
                  placeholder="Email"
                  class="form-control"
                />
              </div>
              <div className="form-group">
                {/* <label> enter password </label> */}
                {touched.password && errors.password && (
                  <p>{errors.password} </p>
                )}

                <Field name="password" type="password" placeholder="Password" class="form-control" />
              </div>

              <div className="submit">
                <input
                  type="submit"
                  className="btn btn-raised btn-primary"
                  value="Login"
                  id="submit"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
            <br />
            <br />

            <div>
              <Link to="/fogotpassword">
                <a>Forgotten password</a>
              </Link>
            </div>
          </div>
          <div />
        </div>
      </div>
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

  handleSubmit(values, { props, setErrors,setSubmitting }) {
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

        if (body) {
          console.log("body - " + body);
          localStorage.setItem("jwt", body);
          console.log(props);
          props.history.push("/dashboard");
        } else {
          setErrors({ invalidcred: "invalid Creadentials" });
          setSubmitting(false)
        }
      })
      .catch(err => {
        console.log(err);
        setSubmitting(false)
      });
  },
  validationSchema: Yup.object().shape({
    email1: Yup.string()
      .email()
      .required("Required"),
    password: Yup.string().required()
  })
})(Formic);

export default Login;

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
