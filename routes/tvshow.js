// Import express
const express = require("express");

// Create a router for tv shows
const router = express.Router();

// Load the models
const TvShow = require("../models/tvshow");

// Create the routes

// /shows/:id Route
router.get("/:id", async (req, res) => {
  const showId = req.params.id;
  const shows = await TvShow.findById(showId);
  res.send(shows);
});

// Get all the tv shows, pointing to /shows
router.get("/", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  // Create a container for filter
  let filter = {};

  // If genre exists, pass it to the filter container
  if (genre) {
    filter.genre = genre;
  }

  // If rating exists, pass it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // If premiere_year exists, pass into the filter container
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  // Apply filter in .find()
  const shows = await TvShow.find(filter);
  res.send(shows);
});

module.exports = router;
