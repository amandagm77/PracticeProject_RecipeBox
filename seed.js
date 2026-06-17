require("dotenv").config();

const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");

const seedRecipes = [
  {
    title: "Classic Pancakes",
    ingredients:
      "1 cup flour, 2 tbsp sugar, 1 tsp baking powder, 1 egg, 1 cup milk",
    instructions:
      "Mix dry ingredients. Add wet ingredients. Stir until combined. Cook on griddle until golden brown.",
    cookTime: 20,
    difficulty: "Easy",
    category: "Breakfast",
  },
  {
    title: "Spaghetti Bolognese",
    ingredients:
      "Spaghetti, ground beef, onion, garlic, tomato sauce, olive oil",
    instructions:
      "Cook pasta. Brown beef with onion and garlic. Add sauce and simmer. Serve over spaghetti.",
    cookTime: 45,
    difficulty: "Medium",
    category: "Dinner",
  },
  {
    title: "Chocolate Chip Cookies",
    ingredients:
      "Butter, sugar, brown sugar, eggs, flour, baking soda, chocolate chips",
    instructions:
      "Mix ingredients. Scoop onto baking sheet. Bake at 350°F for 10-12 minutes.",
    cookTime: 30,
    difficulty: "Easy",
    category: "Dessert",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Recipe.deleteMany({});

    await Recipe.insertMany(seedRecipes);

    console.log("Seed data added successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

seedDatabase();