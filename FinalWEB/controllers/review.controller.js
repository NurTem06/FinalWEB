const db = require("../models");
const Review = db.review;

exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      content: req.body.content,
      rating: req.body.rating,
      user: req.userId,
      movie: req.params.id
    });
    await review.save();
    res.status(201).send({ message: "Отзыв сохранен!" });
  } catch (err) { res.status(500).send({ message: err.message }); }
};

exports.getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.id })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.status(200).send(reviews);
  } catch (err) { res.status(500).send({ message: err.message }); }
};