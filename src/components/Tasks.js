import React, { useState } from "react";

function Tasks() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="feature-container">
      <h2>Tasks & Goals</h2>
      <input type="text" placeholder="Add a task/goal" />
      <button class="icon-btn add-btn">
        <div class="add-icon"></div>
        <div class="btn-txt">Add</div>
      </button>
    </div>
  );
}

export default Tasks;
