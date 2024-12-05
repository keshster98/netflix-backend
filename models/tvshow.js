// Schema for TV show collection
const { Schema, model } = require("mongoose");

// Setup schema
const tvshowsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  premiere_year: {
    type: Number,
    required: true,
  },
  end_year: Number,
  seasons: {
    type: Number,
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
const Tvshow = model("Tvshow", tvshowsSchema);

module.exports = Tvshow; // Equals to "export default TV show" in React
