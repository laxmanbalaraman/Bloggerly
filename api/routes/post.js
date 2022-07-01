const router = require("express").Router();
const Post = require("../models/Post");

// create
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    return res.status(200).send(newPost);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).send("Post updated!");
    } else return req.status(401).send("You can update only your post");
  } catch (err) {
    return res.status(500).send("please enter correct user id");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      await post.delete();
      return res.status(200).send("post has been deleted");
    } else {
      return res.status(401).send("please enter correct user id");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

// GET user

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send("please enter correct user id");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send("please enter correct user id");
  }
});

module.exports = router;
