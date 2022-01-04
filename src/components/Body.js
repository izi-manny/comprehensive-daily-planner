import React from "react";
import Exercise from "./Exercise";
import Meals from "./Meals";
import Motivation from "./Motivation";
import Schedule from "./Schedule";
import Sleep from "./Sleep";
import Tasks from "./Tasks";

function Body() {
  return (
    <div>
      <Sleep />
      <Meals />
      <Tasks />
      <Motivation />
      <Exercise />
      <Schedule />
    </div>
  );
}

export default Body;
