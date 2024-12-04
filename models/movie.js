// Schema for movies collection
const { Schema, model } = require("mongoose");

// Setup the schema
const movieSchema = new Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

// Convert the schema to a model
const Movie = model("Movie", movieSchema);

module.exports = Movie; // Equals to "export default Movie" in React
