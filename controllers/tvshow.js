// Load the TV show model
const Tvshow = require("../models/tvshow");

/* CRUD Functions */

// Get all TV shows
const getTvShows = async (genre, rating, premiere_year) => {
  // Create a container for filter
  let filter = {};
  // If genre exists, pass it to the filter container
  if (genre) {
    filter.genre = genre;
  }
  // If rating exists, pass it to the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }
  // If premiere year exists, pass it to the filter container
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }
  // Apply filter in .find()
  const tvshows = await Tvshow.find(filter);
  return tvshows;
};

// Get one TV show
const getTvShow = async (id) => {
  const tvshow = await Tvshow.findById(id);
  return tvshow;
};

// Add new TV show
const addNewTvShow = async (
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  // Create new TV show
  const newTvShow = new Tvshow({
    title: title, // Long method
    creator, // Short-hand method
    premiere_year,
    end_year,
    seasons,
    genre,
    rating,
  });
  // Save the new TV show into MongoDB
  await newTvShow.save();
  return newTvShow;
};

// Update TV show
const updateTvShow = async (
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) => {
  const updatedTvShow = await Tvshow.findByIdAndUpdate(
    id,
    {
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating,
    },
    {
      new: true, // Return back the updated data
    }
  );
  return updatedTvShow;
};

// Delete TV show
const deleteTvShow = async (id) => {
  return await Tvshow.findByIdAndDelete(id);
};

// Export all the functions
module.exports = {
  getTvShows,
  getTvShow,
  addNewTvShow,
  updateTvShow,
  deleteTvShow,
};
