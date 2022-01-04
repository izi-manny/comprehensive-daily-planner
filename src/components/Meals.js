import React, { useState } from "react";
import axios from "axios";

function Meals() {
  //   const [input, setInput] = useState("");

  const [breakfast, setBreakfast] = useState([]);

  const [lunch, setLunch] = useState([]);

  const [dinner, setDinner] = useState([
    {
      meal_id: 4,
      meal_category: "dinner",
      meal_title: "Chicken",
      user_id: 1,
      date: 12 / 27 / 2021,
    },
  ]);

  const [snacks, setSnacks] = useState([
    {
      meal_id: 5,
      meal_category: "snacks",
      meal_title: "Protein bar",
      user_id: 1,
      date: 12 / 27 / 2021,
    },
  ]);

  function sendForm(input, category) {
    axios
      .post(`http://localhost:5000/api/meals/${category}`, {
        breakfastTitle: input,
        userID: 1,
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
    console.log(e.target.firstChild.innerHTML);
    sendForm(e.target[0].value, e.target.firstChild.innerHTML);
  }

  function breakfastMap() {
    return breakfast.map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
  }

  function lunchMap() {
    return lunch.map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
  }

  function dinnerMap() {
    return dinner.map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
  }

  return (
    <div>
      <h1>Meals</h1>

      <form onSubmit={submitForm}>
        <h2>Breakfast</h2>
        <input
          type="text"
          id="breakfast"
          placeholder="What would you like for breakfast?"
        />
        <button className="fas fa-plus-circle"></button>
      </form>

      {/* {breakfastMap()} */}

      <form onSubmit={submitForm}>
        <h2>Lunch</h2>
        <input type="text" id="lunch" />
        <button className="fas fa-plus-circle"></button>
      </form>

      {/* {lunchMap()} */}

      <form onSubmit={submitForm}>
        <h2>Dinner</h2>
        <input type="text" id="dinner" />
        <button className="fas fa-plus-circle"></button>
      </form>

      <form onSubmit={submitForm}>
        <h2>Snacks</h2>
        <input type="text" id="snacks" />
        <button className="fas fa-plus-circle"></button>
      </form>
    </div>
  );
}

export default Meals;
