const mongoose = require("mongoose");
module.exports = mongoose.model("Review", new mongoose.Schema({
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" }

}, { timestamps: true }));
