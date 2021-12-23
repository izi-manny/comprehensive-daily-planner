import React, { useState } from "react";

function Meals() {
  const [input, setInput] = useState("");

  const [breakfast, setBreakfast] = useState([
    {
      meal_id: 1,
      meal_category: "Breakfast",
      meal_title: "Omlet",
      user_id: 1,
      date: 12 / 27 / 2021,
    },
    {
      meal_id: 2,
      meal_category: "Breakfast",
      meal_title: "Toast",
      user_id: 1,
      date: 12 / 27 / 2021,
    },
  ]);

  function submitForm(e) {
    e.preventDefault();
    console.log(e);
    setInput(e.target[0].value);
  }

  function breakfastMap() {
    breakfast.map((obj) => <p>{obj.meal_title}</p>);
  }

  //   console.log(document.getElementById("breakfast"));
  return (
    <div>
      <h2>Breakfast</h2>
      <form onSubmit={submitForm}>
        <input type="text" id="breakfast" />
        <button className="fas fa-plus-circle"></button>
      </form>

      {breakfast.map((obj) => (
        <p>{obj.meal_title}</p>
      ))}

      <h2>Lunch</h2>
      <form>
        <input type="text" />
      </form>

      <h2>Dinner</h2>
      <form>
        <input type="text" />
      </form>

      <h2>Snacks</h2>
      <form>
        <input type="text" />
      </form>
    </div>
  );
}

export default Meals;
