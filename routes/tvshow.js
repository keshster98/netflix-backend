// Import express
const express = require("express");

// Create a router for TV shows
const router = express.Router();

// Import functions from the controller
const {
  getTvShows,
  getTvShow,
  addNewTvShow,
  updateTvShow,
  deleteTvShow,
} = require("../controllers/tvshow");

// Get all TV shows
// GET http://localhost:5555/shows
router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;
    // Use the getTvShows from the controller to laod the tv shows data
    const tvshows = await getTvShows(genre, rating, premiere_year);
    res.status(200).send(tvshows);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// Get one TV show
// GET http://localhost:5555/shows/9kdm40ikd93k300dkd3o
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const tvshow = await getTvShow(id);
  if (tvshow) {
    res.status(200).send(tvshow);
  } else {
    res.status(404).send("Error: TV show not found!");
  }
});

// Add TV show
// POST http://localhost:5555/shows
router.post("/", async (req, res) => {
  try {
    // Retrieve the data from req.body
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // Check for error
    if (!(title && creator && premiere_year && seasons && genre && rating)) {
      return res.status(400).send({
        error: "Error: Required TV show data is missing!",
      });
    }

    // Pass in all the data to addNewTvShow function
    const newTvShow = await addNewTvShow(
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(newTvShow);
  } catch {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// Update TV show
// PUT http://localhost:5555/shows/9kdm40ikd93k300dkd3o
router.put("/:id", async (req, res) => {
  try {
    // Retrieve the data from req.body
    const id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // Pass in the data into the updateTvShow function
    const updatedTvShow = await updateTvShow(
      id,
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating
    );
    res.status(200).send(updatedTvShow);
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// Delete Tv Show
// DELETE http://localhost:5555/shows/9kdm40ikd93k300dkd3o
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Trigger the deleteTvShow function
    await deleteTvShow(id);
    res.status(200).send({
      message: `Alert: TV show with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    // If there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
