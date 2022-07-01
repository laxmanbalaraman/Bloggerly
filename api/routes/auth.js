const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    await newUser.save();
    return res.status(200).send(newUser);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(400).send("Wrong credentials!");

    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
