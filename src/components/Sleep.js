import React from "react";
import { GiNightSleep } from "react-icons/gi";

function Sleep() {
  return (
    <div className="feature-container">
      <div className="feature-header">
        <h1>Sleep Log</h1>
        <span className="feature-icon">
          <GiNightSleep />
        </span>
      </div>
      <textarea
        cols="30"
        rows="10"
        placeholder="Log last night's sleep here"
      ></textarea>
    </div>
  );
}

export default Sleep;
