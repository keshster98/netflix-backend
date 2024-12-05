// Import express
const express = require("express");

// Create a router for movies
const router = express.Router();

// Import functions from controller
const {
  getMovies,
  getMovie,
  addNewMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

/* 
  Create the CRUD routes:

  - GET /movies - Get all the movies
  - GET /movies/:id - Get one movie by id
  - POST /movies - Add new movie
  - PUT /movies/:id - Update movie
  - DELETE /movies/:id - Delete movie
*/

// Get all the movies, pointing to /movies
router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const director = req.query.director;

    // Use the getMovies from the controller to laod the movies data
    const movies = await getMovies(genre, rating, director);
    res.status(200).send(movies);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// Get one movie by id
// GET http://localhost:5555/movies/9kdm40ikd93k300dkd3o
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await getMovie(id);
    res.status(200).send(movie);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// Add movie
// POST http://localhost:5555/movies
router.post("/", async (req, res) => {
  try {
    // Retrieve the data from req.body
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // Check for error
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({
        error: "Error: Required movie data is missing!",
      });
    }

    // Pass in all the data to addNewMovie function
    const newMovie = await addNewMovie(
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(newMovie);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// Update movie
// PUT http://localhost:5555/movies/9kdm40ikd93k300dkd3o
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;
    // Pass in the data into the updateMovie function
    const updatedMovie = await updateMovie(
      id,
      title,
      director,
      release_year,
      genre,
      rating
    );
    res.status(200).send(updatedMovie);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// Delete movie
// DELETE http://localhost:5555/movies/9kdm40ikd93k300dkd3o
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Trigger the deleteMovie function
    await deleteMovie(id);
    res.status(200).send({
      message: `Alert: Movie with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
