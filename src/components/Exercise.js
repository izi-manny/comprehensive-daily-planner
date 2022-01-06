import React from "react";

function Exercise() {
  return (
    <div className="feature-container">
      <h2>Exercise</h2>
      <input type="text" placeholder="Add a workout" />
      <button class="icon-btn add-btn">
        <div class="add-icon"></div>
        <div class="btn-txt">Add</div>
      </button>
    </div>
  );
}

export default Exercise;
