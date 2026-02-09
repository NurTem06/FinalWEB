const { authJwt } = require("../middlewares");
const db = require("../models");
const User = db.user;
const Review = db.review;

module.exports = function(app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // Получение профиля + история просмотров + история оценок
  app.get("/api/users/:id", [authJwt.verifyToken], async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("watched").select("-password");
      if (!user) return res.status(404).send({ message: "Пользователь не найден" });

      // Ищем все отзывы этого пользователя
      const reviews = await Review.find({ user: req.params.id }).populate("movie");

      res.status(200).send({ user, reviews });
    } catch (err) {
      res.status(500).send({ message: "Ошибка загрузки данных" });
    }
  });

  // Добавление в историю просмотров
  app.post("/api/users/watch/:movieId", [authJwt.verifyToken], async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.userId, {
        $addToSet: { watched: req.params.movieId } // $addToSet исключает дубликаты
      });
      res.status(200).send({ message: "Просмотр зафиксирован" });
    } catch (err) {
      res.status(500).send({ message: "Ошибка записи" });
    }
  });
};