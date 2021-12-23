import React from "react";
import CurrentDate from "./CurrentDate";
import Greeting from "./Greeting";

function Header() {
  return (
    <div>
      <CurrentDate />
      <Greeting />
      {/* Inspirational Quote goes here */}
      {/* Login/Register button goes here */}
    </div>
  );
}

export default Header;
