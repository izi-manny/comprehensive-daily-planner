import React, { useState } from "react";

function Tasks() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Tasks & Goals</h2>
      <input type="text" placeholder="Add a task/goal" value={input} />
      <button className="fas fa-plus-circle"></button>
    </div>
  );
}

export default Tasks;
