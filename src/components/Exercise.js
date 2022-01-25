import React from "react";
import { GiWeightLiftingUp } from "react-icons/gi";

function Exercise() {
  return (
    <div className="feature-container">
      <div className="feature-header">
        <h1>Exercise</h1>
        <span className="feature-icon">
          <GiWeightLiftingUp />
        </span>
      </div>
      <input type="text" placeholder="Add a workout" />
      <button class="icon-btn add-btn">
        <div class="add-icon"></div>
        <div class="btn-txt">Add</div>
      </button>
    </div>
  );
}

export default Exercise;
