// Import express
const express = require("express");

// Import mongoose
const mongoose = require("mongoose");

// Create the express app
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/netflix")
  .then(() => {
    // If MongoDB is successfully connected
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Netflix!");
});

// Import all the routes
const movieRouter = require("./routes/movie");
const tvshowRouter = require("./routes/tvshow");

// Use the routes
app.use("/movies", movieRouter);
app.use("/shows", tvshowRouter);

// Start the server
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
