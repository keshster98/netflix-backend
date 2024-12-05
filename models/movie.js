// Schema for movie collection
const { Schema, model } = require("mongoose");

// Setup the schema
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// Convert the schema to a model
const Movie = model("Movie", movieSchema);

module.exports = Movie; // Equals to "export default Movie" in React
