const express = require("express");
const Category = require("../Models/categorySchema");

const router = express.Router();

router.get("/Category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve categories", details: error.message });
  }
});

router.post("/Category", async (req, res) => {
  try {
    const { name, description, imageUrl, isActive } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Create a new category document
    const newCategory = new Category({
      name,
      description,
      imageUrl,
      isActive: isActive !== undefined ? isActive : true, // Default to true if not provided
    });

    // Save the category to the database
    const savedCategory = await newCategory.save();

    res.status(200).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create category", details: error.message });
  }
});

module.exports = router;

// ././/
