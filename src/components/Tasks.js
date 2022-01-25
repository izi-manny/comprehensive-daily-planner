import React, { useState } from "react";
import { FaTasks } from "react-icons/fa";

function Tasks() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="feature-container">
      <div className="feature-header">
        <h1>Tasks / Goals</h1>
        <span className="feature-icon">
          <FaTasks />
        </span>
      </div>
      <input type="text" placeholder="Add a task/goal" />
      <button class="icon-btn add-btn">
        <div class="add-icon"></div>
        <div class="btn-txt">Add</div>
      </button>
    </div>
  );
}

export default Tasks;
