const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(
          req.body.password,
          await bcrypt.genSalt(10)
        );
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).send(updatedUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    return res.status(401).send("please enter correct user id");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).send("User has been deleted");
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    return res.status(401).send("please enter correct user id");
  }
});

// GET user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).send(others);
  } catch (err) {
    return res.status(500).send("please enter correct user id");
  }
});

module.exports = router;
