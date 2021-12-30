require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  breakfast: (req, res) => {
    // console log the req object
    const { breakfastTitle, userID, category, date } = req.body;
    sequelize
      // console log sequelize
      .query(
        `INSERT INTO meals (
        meal_category,
        meal_title,
        user_id,
        date
        )
        
        VALUES (
        ${category},
        ${breakfastTitle},
        ${userID},
        ${date}
        )`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};
