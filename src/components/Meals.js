import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { GiMeal } from "react-icons/gi";

import "./Meals.css";
import { useNavigate } from "react-router-dom";
import FlipMove from "react-flip-move";

function Meals() {
  let navigate = useNavigate();

  const [meal, setMeal] = useState();
  // console.log(meal);

  function getInfo() {
    const bodyObj = {
      userID: +localStorage.getItem("id"),
      // date converted from UTC to local time
      date: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substring(0, 10),
    };

    axios
      .post("http://localhost:5000/api/getInfo", bodyObj)
      .then((res) => {
        setMeal(res.data.meals[0]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getInfo();
  }, []);

  function sendForm(input, category) {
    if (!input || /^\s*$/.test(input)) {
      return;
    }
    axios
      .post(`http://localhost:5000/api/meals/${category}`, {
        breakfastTitle: input,
        userID: +localStorage.getItem("id"),
        date: new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 10),
      })
      .then((res) => {
        console.log(res);
        getInfo();
        setMeal("");
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
        return (
          <div className="meal-list">
            <p key={element.meal_id}>
              {element.meal_title}
              <span>
                {/* <MdModeEdit /> */}
                <MdDeleteForever onClick={() => deleteMeal(element.meal_id)} />
              </span>
            </p>
          </div>
        );
      }
    });
  }

  function lunchMap() {
    return meal.map((element) => {
      if (element.meal_category === "Lunch") {
        return (
          <div className="meal-list">
            <p key={element.meal_id}>
              {element.meal_title}
              <span>
                {/* <MdModeEdit /> */}
                <MdDeleteForever onClick={() => deleteMeal(element.meal_id)} />
              </span>
            </p>
          </div>
        );
      }
    });
  }

  function dinnerMap() {
    return meal.map((element) => {
      if (element.meal_category === "Dinner") {
        return (
          <div className="meal-list">
            <p key={element.meal_id}>
              {element.meal_title}
              <span>
                {/* <MdModeEdit /> */}
                <MdDeleteForever onClick={() => deleteMeal(element.meal_id)} />
              </span>
            </p>
          </div>
        );
      }
    });
  }

  function snackMap() {
    return meal.map((element) => {
      if (element.meal_category === "Snacks") {
        return (
          <div className="meal-list">
            <p key={element.meal_id}>
              {element.meal_title}
              <span>
                {/* <MdModeEdit /> */}
                <MdDeleteForever onClick={() => deleteMeal(element.meal_id)} />
              </span>
            </p>
          </div>
        );
      }
    });
  }

  function deleteMeal(mealID) {
    let user = +localStorage.getItem("id");

    axios
      .delete(`http://localhost:5000/api/removeMeal`, {
        data: { user: user, meal_ID: mealID },
      })
      .then((res) => {
        console.log(res.data);
        getInfo();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="feature-container">
      <div className="feature-header">
        <h1>Meals</h1>
        <span className="feature-icon">
          <GiMeal />
        </span>
      </div>

      <form onSubmit={submitForm}>
        <h2>Breakfast</h2>
        <input type="text" id="breakfast" placeholder="What's for breakfast?" />
        <button class="icon-btn add-btn">
          <div class="add-icon"></div>
          <div class="btn-txt">Add</div>
        </button>
      </form>
      <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
        {meal ? breakfastMap() : null}
      </FlipMove>

      <form onSubmit={submitForm}>
        <h2>Lunch</h2>
        <input type="text" id="lunch" placeholder="What's for lunch?" />
        <button class="icon-btn add-btn">
          <div class="add-icon"></div>
          <div class="btn-txt">Add</div>
        </button>
      </form>

      <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
        {meal ? lunchMap() : null}
      </FlipMove>

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
