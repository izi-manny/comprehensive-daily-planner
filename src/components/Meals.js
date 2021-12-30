import React, { useState } from "react";
import axios from "axios";

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

  const [lunch, setLunch] = useState([
    {
      meal_id: 3,
      meal_category: "Lunch",
      meal_title: "Steak Sandwich",
      user_id: 1,
      date: 12 / 27 / 2021,
    },
  ]);

  function sendBreakfast() {
    axios
      .post("/api/meals/breakfast", {
        breakfastTitle: breakfast,
        userID: 1,
        category: "Breakfast",
        date: new Date(),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function submitForm(e) {
    e.preventDefault();
    console.log(e);
    setInput(e.target[0].value);
  }

  function breakfastMap() {
    return breakfast.map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
  }

  function lunchMap() {
    return lunch.map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
  }

  return (
    <div>
      <h1>Meals</h1>

      <h2>Breakfast</h2>
      <form onSubmit={submitForm}>
        <input type="text" id="breakfast" />
        <button className="fas fa-plus-circle"></button>
      </form>

      {breakfastMap()}

      <textarea
        id=""
        cols="30"
        rows="10"
        placeholder="What would you like for breakfast?"
      ></textarea>

      <h2>Lunch</h2>
      <form onSubmit={submitForm}>
        <input type="text" id="lunch" />
        <button className="fas fa-plus-circle"></button>
      </form>

      {lunchMap()}

      <h2>Dinner</h2>
      <form onSubmit={submitForm}>
        <input type="text" id="dinner" />
        <button className="fas fa-plus-circle"></button>
      </form>

      <h2>Snacks</h2>
      <form onSubmit={submitForm}>
        <input type="text" id="snacks" />
        <button className="fas fa-plus-circle"></button>
      </form>
    </div>
  );
}

export default Meals;
