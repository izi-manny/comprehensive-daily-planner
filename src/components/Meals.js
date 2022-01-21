import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Meals() {
  const [meal, setMeal] = useState();
  const isMounted = useRef(true);

  useEffect(() => {
    const bodyObj = {
      userID: +localStorage.getItem("id"),
      date: new Date().toISOString().split("T")[0],
    };

    axios
      .post("http://localhost:5000/api/getInfo", bodyObj)
      .then((res) => {
        if (isMounted.current) {
          setMeal(res.data.meals[0]);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isMounted.current = false;
    };
  }, []);

  function sendForm(input, category) {
    axios
      .post(`http://localhost:5000/api/meals/${category}`, {
        breakfastTitle: input,
        userID: +localStorage.getItem("id"),
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
    return meal.map((element) => {
      if (element.meal_category === "Breakfast") {
        return <p key={element.meal_id}>{element.meal_title}</p>;
      }
    });
  }

  function lunchMap() {
    return meal.map((element) => {
      if (element.meal_category === "Lunch") {
        return <p key={element.meal_id}>{element.meal_title}</p>;
      }
    });
  }

  function dinnerMap() {
    return meal.map((element) => {
      if (element.meal_category === "Dinner") {
        return <p key={element.meal_id}>{element.meal_title}</p>;
      }
    });
  }

  function snackMap() {
    return meal.map((element) => {
      if (element.meal_category === "Snacks") {
        return <p key={element.meal_id}>{element.meal_title}</p>;
      }
    });
  }

  return (
    <div className="feature-container">
      <h1>Meals</h1>

      <form onSubmit={submitForm}>
        <h2>Breakfast</h2>
        <input type="text" id="breakfast" placeholder="What's for breakfast?" />
        <button class="icon-btn add-btn">
          <div class="add-icon"></div>
          <div class="btn-txt">Add</div>
        </button>
      </form>

      {meal ? breakfastMap() : null}

      <form onSubmit={submitForm}>
        <h2>Lunch</h2>
        <input type="text" id="lunch" placeholder="What's for lunch?" />
        <button class="icon-btn add-btn">
          <div class="add-icon"></div>
          <div class="btn-txt">Add</div>
        </button>
      </form>

      {meal ? lunchMap() : null}

      <form onSubmit={submitForm}>
        <h2>Dinner</h2>
        <input type="text" id="dinner" placeholder="What's for dinner?" />
        <button class="icon-btn add-btn">
          <div class="add-icon"></div>
          <div class="btn-txt">Add</div>
        </button>
      </form>

      {meal ? dinnerMap() : null}

      <form onSubmit={submitForm}>
        <h2>Snacks</h2>
        <input type="text" id="snacks" placeholder="Any munches?" />
        <button class="icon-btn add-btn">
          <div class="add-icon"></div>
          <div class="btn-txt">Add</div>
        </button>
      </form>

      {meal ? snackMap() : null}
    </div>
  );
}

export default Meals;
