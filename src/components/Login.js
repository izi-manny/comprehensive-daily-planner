import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import banner from "../assets/app-banner.png";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import "./Login.css";

function Login(props) {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    axios
      .post("http://localhost:5000/api/login", values)
      .then((res) => {
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("firstName", res.data.firstName);
        localStorage.setItem("lastName", res.data.lastName);
        props.logFunction();
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username Required";
    }
    if (!values.password) {
      errors.password = "Please enter a password";
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="login-container">
      <div className="welcome-container">
        <img src={banner} alt="" />
        <p>
          Welcome to the daily productivity app that integrates the cornerstones
          of a healthy body and mind: <strong>Sleep</strong>,{" "}
          <strong>nutrition</strong> and <strong>exercise</strong>.
        </p>
      </div>
      <div className="login-form">
        <h2>Sign In</h2>
        <form
          onSubmit={formik.handleSubmit}
          // className="login-form"
        >
          {/* <label htmlFor="username">Username:</label> */}
          <div className="input-icon-wrap">
            <span>
              <FaUser />
            </span>
            <span>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
              />
            </span>
          </div>

          {/* <label htmlFor="password">Password:</label> */}
          <div className="input-icon-wrap">
            <span>
              <MdPassword />
            </span>

            <span>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
              />
            </span>
          </div>
          <button type="submit">Sign In</button>
          <span>No account?</span>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
