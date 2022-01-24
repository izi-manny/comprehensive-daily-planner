require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const path = require("path");

const { PORT } = process.env;
const controller = require("./controller.js");

// Middleware
app.use(express.json());
app.use(cors());

// app.use(session({ secret: ACCES_TOKEN_SECRET }));

// Routes
app.post("/api/register", controller.register);

app.post("/api/login", controller.login);

app.post("/api/meals/:category", controller.meal);

// app.get("/api/meals", controller.getMeals);

app.post("/api/getInfo", controller.getInfo);

app.delete("/api/removeMeal", controller.deleteMeal);

app.listen(PORT, () => console.log(`up on ${PORT}`));
