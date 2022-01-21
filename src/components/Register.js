import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, useFormik } from "formik";

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
      .post("http://localhost:3000/api/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("username", res.data[0][0].username);
        localStorage.setItem("username", res.data[0][0].firstName);
        localStorage.setItem("username", res.data[0][0].lastName);
        localStorage.setItem("username", res.data[0][0].userID);

        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username Required";
    }
    if (!values.password) {
      errors.password = "Password Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be longer than 8 characters";
    }
    if (!values.firstName) {
      errors.firstName = "Please insert First Name";
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
    <div>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          name="first-name"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          placeholder="First Name"
        />
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          name="last-name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          placeholder="Last Name"
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
        />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="confirm-password"
          name="confirm-password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          placeholder="COnfirm Password"
        />
        <button type="submit">Register</button>
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
