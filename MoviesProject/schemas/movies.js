const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  IMDB_rating: { type: Number, required: true },
  year: { type: Number, required: true },
});

const movie = mongoose.model("movies", movieSchema);

module.exports = movie;
