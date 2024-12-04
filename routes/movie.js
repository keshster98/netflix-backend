// Import express
const express = require("express");

// Create a router for movies
const router = express.Router();

// Load the models
const Movie = require("../models/movie");

// Create the routes

// /movies/:id Route
router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  const movies = await Movie.findById(movieId);
  res.send(movies);
});

// Get all the movies, pointing to /movies
router.get("/", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const director = req.query.director;

  // Create a container for filter
  let filter = {};

  // If genre exists, pass it to the filter container
  if (genre) {
    filter.genre = genre;
  }

  // If rating exist, pass it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // If director exist, pass into the filter container
  if (director) {
    filter.director = director;
  }

  // Apply filter in .find()
  const movies = await Movie.find(filter);
  res.send(movies);
});

module.exports = router;
