import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FaUser } from "react-icons/fa";
import { MdPassword, MdEmail } from "react-icons/md";
import { BiRename, BiUserCircle } from "react-icons/bi";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    // console.log(values);
    axios
      .post("http://localhost:5000/api/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("username", res.data[0][0].username);
        localStorage.setItem("firstName", res.data[0][0].firstName);
        localStorage.setItem("lastName", res.data[0][0].lastName);
        localStorage.setItem("ID", res.data[0][0].userID);

        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Please insert First Name";
    }

    if (!values.username) {
      errors.username = "Username Required";
    }
    if (!values.password) {
      errors.password = "Password Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be longer than 8 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "PLease confirm password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="register-container">
      <h2>Signup</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-icon-wrap">
          <span>
            <FaUser />
          </span>
          <span>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              placeholder="First Name"
            />
          </span>
          <span>
            <BiUserCircle />
          </span>
          <span>
            <input
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              placeholder="Last Name"
            />
          </span>
          <span>
            <BiRename />
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
          <span>
            <MdEmail />
          </span>
          <span>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
          </span>
          <span>
            <MdPassword />
          </span>
          <span>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="password"
            />
          </span>

          <span>
            <MdPassword />
          </span>
          <span>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              placeholder="Confirm Password"
            />
          </span>
        </div>
        <button type="submit">Sign Up!</button>
      </form>
      <div>
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}
        {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        {formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
    </div>
  );
}

export default Register;
