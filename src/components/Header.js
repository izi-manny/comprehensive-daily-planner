import React from "react";
import CurrentDate from "./CurrentDate";
import Greeting from "./Greeting";
import Quote from "./Quote";
import "./Header.css";
import logo from "../assets/app-logo.png";

function Header() {
  function signOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("id");
    window.location.reload(true);
  }

  return (
    <div className="app-header">
      <div className="signoff-button">
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div className="app-logo">
        <div className="outer-container">
          <img src={logo} alt="app logo" />
          <h1>Comprehensive Daily Planner</h1>
        </div>
      </div>
      <CurrentDate />

      <div className="outer-container-greeting">
        <div className="greeting-container">
          <Greeting />
        </div>

        <Quote />
      </div>
    </div>
  );
}

export default Header;
