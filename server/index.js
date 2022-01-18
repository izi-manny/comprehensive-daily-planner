require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");

const { PORT, ACCES_TOKEN_SECRET } = process.env;
const controller = require("./controller.js");

app.use(express.json());
app.use(cors());

app.use(session({ secret: ACCES_TOKEN_SECRET }));

// Routes

app.post("/api/register", controller.register);

app.post("/api/login", controller.login);

app.get("/api/login", controller.getUser);

app.post("/api/meals/:category", controller.meal);

app.get("/api/meals", controller.getMeals);

app.listen(PORT, () => console.log(`up on ${PORT}`));
