const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    imageUrl: {
      type: String, // URL to an image representing the category
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true, // Whether the category is active or not
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds 'createdAt' and 'updatedAt' fields automatically
  }
);

// Create and export the Category model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
