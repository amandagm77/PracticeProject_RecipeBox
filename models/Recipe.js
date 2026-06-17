const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },

    ingredients: {
      type: String,
      required: [true, "Ingredients are required"],
      trim: true,
    },

    instructions: {
      type: String,
      required: [true, "Instructions are required"],
      trim: true,
    },

    cookTime: {
      type: Number,
      required: [true, "Cook time is required"],
      min: [1, "Cook time must be at least 1 minute"],
    },

    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: ["Easy", "Medium", "Hard"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;