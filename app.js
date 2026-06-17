const express = require("express");
const path = require("path");
const Recipe = require("./models/Recipe");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

// READ
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.render("list", { recipes });
  } catch (error) {
    res.send("Error loading recipes: " + error.message);
  }
});

// CREATE FORM
app.get("/recipes/new", (req, res) => {
  res.render("create");
});

// CREATE
app.post("/recipes", async (req, res) => {
  try {
    await Recipe.create(req.body);
    res.redirect("/success?message=Recipe created successfully");
  } catch (error) {
    res.send("Error creating recipe: " + error.message);
  }
});

// EDIT FORM
app.get("/recipes/:id/edit", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("edit", { recipe });
  } catch (error) {
    res.send("Error loading edit form: " + error.message);
  }
});

// UPDATE
app.post("/recipes/:id/edit", async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    res.redirect("/success?message=Recipe updated successfully");
  } catch (error) {
    res.send("Error updating recipe: " + error.message);
  }
});

// DELETE CONFIRMATION
app.get("/recipes/:id/delete", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("delete", { recipe });
  } catch (error) {
    res.send("Error loading delete page: " + error.message);
  }
});

// DELETE
app.post("/recipes/:id/delete", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect("/success?message=Recipe deleted successfully");
  } catch (error) {
    res.send("Error deleting recipe: " + error.message);
  }
});

// SUCCESS
app.get("/success", (req, res) => {
  const message = req.query.message || "Action completed successfully";
  res.render("success", { message });
});

module.exports = app;