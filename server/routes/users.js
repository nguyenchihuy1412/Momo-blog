const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const argon2 = require("argon2");

//UPDATE
router.put("/update/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "You can update only your account!",
    });
  }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
          sucess: true,
          message: "User has been deleted...",
        });
      } catch (err) {
        res.status(500).json({
          sucess: false,
          message: "Server error",
        });
      }
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } else {
    res.status(401).json({
      sucess: false,
      message: "You can update only your account!",
    });
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({
      success: true,
      message: "Get user successfully",
      user: others,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Server error",
    });
  }
});

// GET ALL USER
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const { password, ...other } = users;
    res.status(200).json({
      sucess: true,
      message: "Get users successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
