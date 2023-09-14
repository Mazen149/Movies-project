const express = require("express");
const router = express.Router();
const movie = require("../schemas/movies");
const fs = require("fs");

// Middleware to log requests
const logger = (req, res, next) => {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  // Append the log entry to log.txt
  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });

  // Continue with the request
  next();
};

// Listing all movies
router.get("/", logger, async (req, res) => {
  const Movies = await movie.find({});
  res.send(Movies);
});

// Add new movie
router.post("/", logger, (req, res) => {
  const body = req.body;

  const newMovie = new movie({
    name: body.name,
    type: body.type,
    IMDB_rating: body.IMDB_rating,
    year: body.year,
  });

  newMovie.save();

  res.send(newMovie);
});

// Delete movie
router.delete("/:id", logger, async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.send({ error: true, message: "ID is invalid" });
    return;
  }

  const result = await movie.findByIdAndDelete(id);
  res.send(result);
});

// Update movie
router.put("/:id", logger, async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!id) {
    res.send({ error: true, message: "ID is invalid" });
    return;
  }

  const Movie = await movie.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  res.send(Movie);
});

module.exports = router;
