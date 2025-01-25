const express = require("express");
const User = require("../Models/userSchema");

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const { name, mobileNumber, password, role } = req.body;

    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this mobile number already exists" });
    }

    const newUser = new User({ name, mobileNumber, password, role });
    const savedUser = await newUser.save();

    res.status(200).json({ message: "User Saved Success", user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/Users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(204).json({ error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
