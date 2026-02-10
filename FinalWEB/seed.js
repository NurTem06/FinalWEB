require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/movie.model');

const movies = [
  {
    title: "Inception",
    description: "Cobb steals information from his targets by entering their dreams.",
    director: "Christopher Nolan",
    genres: ["Sci-Fi", "Action"],
    trailerUrl: "https://www.youtube.com/embed/8hP9D6kZseM"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space to save humanity.",
    director: "Christopher Nolan",
    genres: ["Sci-Fi", "Drama"],
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
    director: "Lana Wachowski",
    genres: ["Action", "Sci-Fi"],
    trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8"
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Movie.deleteMany({}); // Очистим если что-то было
    await Movie.insertMany(movies);
    console.log("✅ База успешно заполнена фильмами!");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);

  });
