const { authJwt } = require("../middlewares");
const movieController = require("../controllers/movie.controller");
const reviewController = require("../controllers/review.controller"); // Импортируем контроллер

module.exports = function(app) {
  // Фильмы
  app.get("/api/movies", movieController.findAll);
  app.post("/api/movies", [authJwt.verifyToken, authJwt.isAdmin], movieController.create);

  // ОТЗЫВЫ (Добавь это ниже)
  app.get("/api/movies/:id/reviews", reviewController.getMovieReviews);
  app.post("/api/movies/:id/reviews", [authJwt.verifyToken], reviewController.createReview);
};