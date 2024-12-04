// Creating a schema for the tv show collection
const { Schema, model } = require("mongoose");

// Setup the schema
const tvshowSchema = new Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

// Convert the schema to a model
const TvShow = model("TvShow", tvshowSchema);

module.exports = TvShow; // Equals to "export default TvShow" in React
