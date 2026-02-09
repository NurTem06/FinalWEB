const mongoose = require("mongoose");
module.exports = mongoose.model("Movie", new mongoose.Schema({
  title: String,
  description: String,
  director: String,
  genres: [String],
  trailerUrl: String
}, { timestamps: true }));