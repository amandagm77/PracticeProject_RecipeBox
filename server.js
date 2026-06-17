require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("RecipeBox server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});