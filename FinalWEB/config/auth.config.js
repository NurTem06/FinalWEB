module.exports = {
  // Проверяем .env, если его нет — используем жестко заданную строку
  secret: process.env.JWT_SECRET || "movie-hub-super-secret-key-2026"
};