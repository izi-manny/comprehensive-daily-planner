import React, { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  // const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <div className="planner-app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
