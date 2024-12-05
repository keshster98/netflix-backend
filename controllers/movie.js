// Load the movie model
const Movie = require("../models/movie");

/* CRUD functions */

// Get all movies
const getMovies = async (genre, rating, director) => {
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
  return movies;
};

// Get one movie
const getMovie = async (id) => {
  const movie = await Movie.findById(id);
  return movie;
};

// Add new movie
const addNewMovie = async (title, director, release_year, genre, rating) => {
  // Create new movie
  const newMovie = new Movie({
    title: title, // Long method
    director, // Short-hand method
    release_year,
    genre,
    rating,
  });
  // Save the new movie into MongoDB
  await newMovie.save();
  return newMovie;
};

// Update movie
const updateMovie = async (
  id,
  title,
  director,
  release_year,
  genre,
  rating
) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    {
      title,
      director,
      release_year,
      genre,
      rating,
    },
    {
      new: true, // Return back the updated data
    }
  );
  return updatedMovie;
};

// Delete movie
const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

// Export all the functions
module.exports = {
  getMovies,
  getMovie,
  addNewMovie,
  updateMovie,
  deleteMovie,
};
