import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password === confirmPassword) {
      axios
        .post("http://localhost:5000/api/register", {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
        })
        .then(() => {
          navigate("/login");
        });
    } else {
      // alert user that passwords don't match
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="first-name">First Name:</label>
        <input id="first-name" type="text" required />

        <label for="last-name">Last Name:</label>
        <input id="last-name" type="text" required />

        <label for="username">Username:</label>
        <input id="username" type="text" required />

        <label for="email">Email:</label>
        <input id="email" type="text" required />

        <label for="password">Password:</label>
        <input id="password" type="password" required />

        <label for="confirm-password">Confirm Password:</label>
        <input id="confirm-password" type="password" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
