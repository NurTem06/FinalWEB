const db = require("../models"); 
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

exports.register = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role || "user"
    });
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ message: "User Not found." });

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: "Invalid Password!" });

    const token = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: 86400 });
    res.status(200).send({
      id: user._id,
      username: user.username,
      role: user.role,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};