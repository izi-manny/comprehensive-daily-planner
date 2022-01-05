require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = process.env;
const controller = require("./controller.js");

app.use(express.json());
app.use(cors());

app.post("/api/meals/:category", controller.meal);

app.get("/api/food", controller.getMeals);

app.listen(PORT, () => console.log(`up on ${PORT}`));
