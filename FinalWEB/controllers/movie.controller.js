const db = require("../models");
const Movie = db.movie;

exports.findAll = (req, res) => {
  Movie.find().then(data => res.send(data)).catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
  const movie = new Movie(req.body);
  movie.save().then(data => res.send(data)).catch(err => res.status(500).send(err));
};