import React from "react";
import CurrentDate from "./CurrentDate";
import Greeting from "./Greeting";
import Quote from "./Quote";

function Header() {
  return (
    <div className="app-header">
      <CurrentDate />
      <Greeting />
      <Quote />
    </div>
  );
}

export default Header;
