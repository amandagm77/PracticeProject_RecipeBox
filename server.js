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
  res.redirect("home");
});
app.get("/home", (req, res) => {
  res.render("home");
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

    res.redirect("/success?message=Recipe created successfully");
  } catch (error) {
    res.send("Error creating recipe: " + error.message);
  }
});

// EDIT FORM: show one recipe in edit form
app.get("/recipes/:id/edit", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("edit", { recipe });
  } catch (error) {
    res.send("Error loading edit form: " + error.message);
  }
});

// UPDATE: handle edit form submission
app.post("/recipes/:id/edit", async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookTime: req.body.cookTime,
      difficulty: req.body.difficulty,
      category: req.body.category,
    });

    res.redirect("/success?message=Recipe updated successfully");
  } catch (error) {
    res.send("Error updating recipe: " + error.message);
  }
});

// DELETE CONFIRMATION PAGE
app.get("/recipes/:id/delete", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("delete", { recipe });
  } catch (error) {
    res.send("Error loading delete page: " + error.message);
  }
});

// DELETE: handle delete confirmation
app.post("/recipes/:id/delete", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect("/success?message=Recipe deleted successfully");
  } catch (error) {
    res.send("Error deleting recipe: " + error.message);
  }
});

// SUCCESS PAGE
app.get("/success", (req, res) => {
  const message = req.query.message || "Action completed successfully";
  res.render("success", { message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});