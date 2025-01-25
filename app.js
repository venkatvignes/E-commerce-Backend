const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
// const Movie = require("./Models/userSchema");
const apiRoutes = require("./Api/userRoutes");
const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use("/app", apiRoutes);
//monogConnection
const MongoUrI = process.env.MONGO_URI;

mongoose
  .connect(MongoUrI)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Retrieve data without a schema

// static data push
// async function addMovie() {
//   const newMovie = new Movie({
//     title: "Inception",
//     director: "Christopher Nolan",
//     releaseYear: 2010,
//     genres: ["Sci-Fi", "Thriller"],
//   });

//   try {
//     const savedMovie = await newMovie.save(); // Save to the database
//     console.log("Movie Saved:", savedMovie);
//   } catch (err) {
//     console.error("Error saving movie:", err);
//   }
// }

// addMovie();

app.listen("4000");
