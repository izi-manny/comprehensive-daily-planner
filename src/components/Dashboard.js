import React from "react";
import Exercise from "./Exercise";
import Meals from "./Meals";
import Motivation from "./Motivation";
import Schedule from "./Schedule";
import Sleep from "./Sleep";
import Tasks from "./Tasks";
import Header from "./Header";
import "./Dashboard.css";

function Body() {
  return (
    <div>
      <div className="app-header">
        <Header />
      </div>
      <div className="app-body">
        <div>
          <Sleep />
          <Meals />
        </div>
        <div>
          <Schedule />
        </div>
        <div>
          <Tasks />
          <Motivation />
          <Exercise />
        </div>
      </div>
    </div>
  );
}

export default Body;
