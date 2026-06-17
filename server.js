require("dotenv").config();

const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const Recipe = require("./models/Recipe");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
  res.redirect("/recipes");
});

// READ: show all recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    res.render("list", { recipes });
  } catch (error) {
    res.send("Error loading recipes: " + error.message);
  }
});

// CREATE FORM: show form
app.get("/recipes/new", (req, res) => {
  res.render("create");
});

// CREATE: handle form submission
app.post("/recipes", async (req, res) => {
  try {
    await Recipe.create({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookTime: req.body.cookTime,
      difficulty: req.body.difficulty,
      category: req.body.category,
    });

    res.redirect("/recipes");
  } catch (error) {
    res.send("Error creating recipe: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});