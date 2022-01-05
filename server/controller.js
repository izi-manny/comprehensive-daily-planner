require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const { user } = require("pg/lib/defaults");
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
  meal: (req, res) => {
    // console log the req object
    const { breakfastTitle, userID, date } = req.body;
    const { category } = req.params;

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
            '${category}',
            '${breakfastTitle}',
            ${userID},
            '${date}'
            )`
      )
      .then((dbRes) => res.status(200).send(dbRes[0])) // awaits the result of the previous function
      .catch((err) => console.log(err));
  },
  getMeals: async (req, res) => {
    const { userID, date } = req.body;
    console.log(req.params);
    const dinner = await sequelize.query(
      `SELECT * FROM meals
        WHERE user_id = ${userID} AND meal_category = 'Dinner' AND date = '${date}'`
    );
    const breakfast = await sequelize.query(
      `SELECT * FROM meals
        WHERE user_id = ${userID} AND meal_category = 'Breakfast' AND date = '${date}'`
    );
    const lunch = await sequelize.query(
      `SELECT * FROM meals
        WHERE user_id = ${userID} AND meal_category = 'Lunch' AND date = '${date}'`
    );
    const snacks = await sequelize.query(
      `SELECT * FROM meals
        WHERE user_id = ${userID} AND meal_category = 'Snacks' AND date = '${date}'`
    );

    const meals = [breakfast[0], lunch[0], dinner[0], snacks[0]];
    res.status(200).send(meals);
  },
};
