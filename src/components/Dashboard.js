import React from "react";
import Exercise from "./Exercise";
import Meals from "./Meals";
import Motivation from "./Motivation";
import Schedule from "./Schedule";
import Sleep from "./Sleep";
import Tasks from "./Tasks";
import Header from "./Header";

function Body() {
  return (
    <div>
      <Header />
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
  );
}

export default Body;
