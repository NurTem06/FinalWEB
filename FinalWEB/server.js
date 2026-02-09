require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = require("./models");


db.mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));

require("./routes/auth.routes")(app);
require("./routes/movie.routes")(app);
// ... после остальных роутов
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));