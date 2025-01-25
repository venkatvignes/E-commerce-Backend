const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true, // Removes extra spaces
    },
    mobileNumber: {
      type: String,
      required: true, // Mobile number is mandatory
      unique: true, // Ensures no duplicate numbers
      match: [
        // Regex to validate mobile number format
        /^[0-9]{10}$/, // Allows only 10-digit numbers
        "Please enter a valid 10-digit mobile number",
      ],
    },
    password: {
      type: String,
      required: true, // Password is mandatory
      minlength: 6, // Minimum password length
    },
    role: {
      type: String,
      enum: ["admin", "user"], // Restricts to 'admin' or 'user'
      default: "user", // Default role is 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation date
    },
    isActive: {
      type: Boolean,
      default: true, // Default status is active
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
