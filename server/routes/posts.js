const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      success: true,
      message: "Post successfully created",
      post: savedPost,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Server error",
    });
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          success: true,
          message: "Post updated successfully",
          post,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Server error",
        });
      }
    } else {
      res.status(401).json({
        sucess: false,
        message: "You can update only your post!",
      });
    }
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Server error",
    });
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json({
          success: true,
          message: "Post has been deleted...",
        });
      } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
      }
    } else {
      res
        .status(401)
        .json({ sucess: false, message: "You can delete only your post!" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Get post successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

//GET ALL POSTS
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
    res.status(200).json({
      success: true,
      message: "Get posts successfully",
      posts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
