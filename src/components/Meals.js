import React, { useState, useEffect } from "react";
import axios from "axios";

function Meals() {
  //   const [input, setInput] = useState("");

  const [meal, setMeal] = useState([
    [
      {
        meal_id: 0,
        meal_category: "",
        meal_title: "",
        user_id: 0,
        date: "",
      },
    ],
    [
      {
        meal_id: 0,
        meal_category: "",
        meal_title: "",
        user_id: 0,
        date: "",
      },
    ],
    [
      {
        meal_id: 0,
        meal_category: "",
        meal_title: "",
        user_id: 0,
        date: "",
      },
    ],
    [
      {
        meal_id: 0,
        meal_category: "",
        meal_title: "",
        user_id: 0,
        date: "",
      },
    ],
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/food", {
        params: {
          userID: 1,
          date: new Date().toISOString().split("T")[0],
        },
      })
      .then((res) => {
        console.log(res);
        setMeal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function sendForm(input, category) {
    axios
      .post(`http://localhost:5000/api/meals/${category}`, {
        breakfastTitle: input,
        userID: 1,
        date: new Date().toISOString().split("T")[0],
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
    sendForm(e.target[0].value, e.target.firstChild.innerHTML);
  }

  function breakfastMap() {
    return meal[0].map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
  }

  function lunchMap() {
    return meal[1].map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
  }

  function dinnerMap() {
    return meal[2].map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
  }

  function snackMap() {
    return meal[3].map((obj) => <p key={obj.meal_id}>{obj.meal_title}</p>);
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

      {breakfastMap()}

      <form onSubmit={submitForm}>
        <h2>Lunch</h2>
        <input type="text" id="lunch" />
        <button className="fas fa-plus-circle"></button>
      </form>

      {lunchMap()}

      <form onSubmit={submitForm}>
        <h2>Dinner</h2>
        <input type="text" id="dinner" />
        <button className="fas fa-plus-circle"></button>
      </form>

      {dinnerMap()}

      <form onSubmit={submitForm}>
        <h2>Snacks</h2>
        <input type="text" id="snacks" />
        <button className="fas fa-plus-circle"></button>
      </form>

      {snackMap()}
    </div>
  );
}

export default Meals;
