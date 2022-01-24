require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const { user } = require("pg/lib/defaults");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

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

    // if any rows are returned in the metadata, it means the user already exists
    if (checkUsername[1].rowCount !== 0) {
      res.status(401).send("Username already exists");
    } else {
      const salt = bcrypt.genSaltSync(5);
      const hashPassword = bcrypt.hashSync(password, salt);

      await sequelize.query(
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
      );
      const userInfo = await sequelize.query(`
        SELECT user_id, username, user_first_name, user_last_name WHERE username= '${username}' `);
      res.status(200).send(userInfo);
      // .then((dbRes) => res.status(201).send(dbRes[0]))
      // .catch((err) => console.log(err));
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    const validUser = await sequelize
      .query(`SELECT * FROM users WHERE username='${username}'`)
      .catch((err) => console.log(err));

    // console.log(validUser[0][0]);
    if (validUser[1].rowCount === 1) {
      if (bcrypt.compareSync(password, validUser[0][0].user_password)) {
        let object = {
          id: validUser[0][0].user_id,
          firstName: validUser[0][0].user_first_name,
          lastName: validUser[0][0].user_last_name,
          username,
        };
        res.status(200).send(object);
      } else {
        res.status(401).send("Password is Incorrect");
      }
    } else {
      res.status(401).send("Username is Incorrect");
    }
  },

  getInfo: async (req, res) => {
    const { userID, date } = req.body;

    let sleep = await sequelize
      .query(`SELECT * FROM sleep WHERE user_id=${userID} AND date='${date}'`)
      .catch((err) => {
        console.log(err);
      });

    sleep = sleep[1];

    let meals = await sequelize
      .query(`SELECT * FROM meals WHERE user_id=${userID} AND date='${date}'`)
      .catch((err) => {
        console.log(err);
      });

    const tasks = await sequelize
      .query(`SELECT * FROM tasks WHERE user_id=${userID} AND date='${date}'`)
      .catch((err) => {
        console.log(err);
      });
    const motivation = await sequelize
      .query(
        `SELECT * FROM motivation WHERE user_id=${userID} AND date='${date}'`
      )
      .catch((err) => {
        console.log(err);
      });
    const exercise = await sequelize
      .query(
        `SELECT * FROM exercise WHERE user_id=${userID} AND date='${date}'`
      )
      .catch((err) => {
        console.log(err);
      });
    const schedule = await sequelize
      .query(
        `SELECT * FROM schedule WHERE user_id=${userID} AND date='${date}'`
      )
      .catch((err) => {
        console.log(err);
      });

    const info = {
      sleep,
      meals,
      tasks,
      motivation,
      exercise,
      schedule,
    };

    res.status(200).send(info);
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

  deleteMeal: async (req, res) => {
    // console.log(req.body);
    const { user, meal_ID } = req.body;
    // console.log(user);
    // console.log(meal_id);

    await sequelize
      .query(`DELETE FROM meals WHERE user_id=${user} AND meal_id='${meal_ID}'`)
      .then(() => res.status(200).send("Meal removed successfully"))
      .catch((err) => console.log(err));
  },
  // getMeals: async (req, res) => {
  //   const { userID, date } = req.query;
  //   const dinner = await sequelize.query(
  //     `SELECT * FROM meals
  //         WHERE user_id = ${userID} AND meal_category = 'Dinner' AND date = '${date}'`
  //   );
  //   const breakfast = await sequelize.query(
  //     `SELECT * FROM meals
  //         WHERE user_id = ${userID} AND meal_category = 'Breakfast' AND date = '${date}'`
  //   );
  //   const lunch = await sequelize.query(
  //     `SELECT * FROM meals
  //         WHERE user_id = ${userID} AND meal_category = 'Lunch' AND date = '${date}'`
  //   );
  //   const snacks = await sequelize.query(
  //     `SELECT * FROM meals
  //         WHERE user_id = ${userID} AND meal_category = 'Snacks' AND date = '${date}'`
  //   );

  //   const meals = [breakfast[0], lunch[0], dinner[0], snacks[0]];
  //   res.status(200).send(meals);
  // },
};
