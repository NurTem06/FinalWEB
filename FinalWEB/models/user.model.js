const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    watched: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }] // Связь с фильмами
  })

);
