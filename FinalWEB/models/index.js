const mongoose = require('mongoose');
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.movie = require("./movie.model");
db.review = require("./review.model");

module.exports = db;
