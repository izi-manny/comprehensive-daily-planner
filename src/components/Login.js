import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  let user;

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     username,
  //     password,
  //   });
  //   setToken(token);
  // };

  function loginUser(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/login", {
        username,
        password,
      })
      .then((res) => {
        user = res.data;
        console.log(user);
        navigate("../dashboard");
      });
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form onSubmit={loginUser}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
