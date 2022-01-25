import React from "react";
import { GiMeditation } from "react-icons/gi";

function Motivation() {
  return (
    <div className="feature-container">
      <div className="feature-header">
        <h1>Motivation/Affirmation</h1>
        <span className="feature-icon">
          <GiMeditation />
        </span>
      </div>
      <textarea
        cols="30"
        rows="10"
        placeholder="What drives you today?"
      ></textarea>
    </div>
  );
}

export default Motivation;
