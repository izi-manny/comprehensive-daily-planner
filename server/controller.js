require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const { user } = require("pg/lib/defaults");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      require: true,
    },
  },
});

module.exports = {
  register: async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    const checkUsername = await sequelize.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );

    if (checkUsername[1].rowCount !== 0) {
      res.status(401).send("Username already exists");
    } else {
      const salt = bcrypt.genSaltSync(5);
      const hashPassword = bcrypt.hashSync(password, salt);

      const newUser = await sequelize
        .query(
          `INSERT INTO users (
          user_first_name,
          user_last_name,
          username,
          user_email,
          user_password
        )
        VALUES (
          '${firstName}',
          '${lastName}',
          '${username}',
          '${email}',
          '${hashPassword}'
        );`
        )
        .then((dbRes) => res.status(200).send(dbRes[0]))
        .catch((err) => console.log(err));
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await sequelize
      .query(`SELECT * FROM users WHERE username='${username}'`)
      .then((dbRes) => dbRes[0][0]);

    let { username: dbUsername, user_password: dbPassword } = user;

    if (!dbUsername) {
      return res.status(404).send("Username not found");
    }

    const authenticated = await bcrypt.compareSync(password, dbPassword);

    if (!authenticated) {
      return res.status(403).send("Not authorized");
    }

    delete user.user_password;

    dbPassword = null;

    req.session.user = user;
    res.status(200).send(user);
  },

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
            );`
      )
      .then((dbRes) => res.status(200).send(dbRes[0])) // awaits the result of the previous function
      .catch((err) => console.log(err));
  },
  getMeals: async (req, res) => {
    const { userID, date } = req.query;
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
