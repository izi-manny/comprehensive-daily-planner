import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  const validationSchema = Yup.object({
    firstName: Yup.string().min(3, "It's too short").required("Required"),
    lastName: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:3000/api/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then(() => {
        navigate("/login");
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div>
            <Form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                placeholder="First Name"
              />

              <input
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="Last Name"
              />

              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
              />

              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Email"
              />
              <ErrorMessage name="password" />
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
              />
              <ErrorMessage name="password" />

              <input
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder="Confirm Password"
              />

              <button type="submit" disabled={!formik.isValid}>
                Register
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default Register;
