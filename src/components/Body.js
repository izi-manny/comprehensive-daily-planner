import React from "react";
import Meals from "./Meals";
import Motivation from "./Motivation";
import Sleep from "./Sleep";
import Tasks from "./Tasks";

function Body() {
  return (
    <div>
      <Sleep />
      <Meals />
      <Tasks />
      <Motivation />
    </div>
  );
}

export default Body;
