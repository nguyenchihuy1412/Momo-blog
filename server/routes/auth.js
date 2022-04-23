const router = require("express").Router();
const User = require("../models/User");
const argon2 = require("argon2");

/* 
  - save() => Lưu
  - delete() => Xóa
  - deleteMany() => Xóa nhiều
  - find() => Tìm nhiều
  - findById() => Tìm theo Id
  - findByIdAndUpdate() = Tìm theo Id và sửa
  - findByIdAndDelete() = Tìm theo Id và xóa
*/

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password or email",
    });
  }

  // Create account
  try {
    // Check if the user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "username already exists",
      });
    }

    // Check if the email already exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }

    // All good
    const hashedPass = await argon2.hash(req.body.password);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    // Save new user
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Account successfully created",
      id: newUser._id,
      username: newUser.username
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "Server Error",
    });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
  // Simple validation
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      succes: false,
      message: "Missing username or password",
    });
  }

  try {
    // Check user is already exists
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    // Username is already
    const validated = await argon2.verify(user.password, password);
    if (!validated)
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    res.status(200).json({
      success: true,
      message: "Loggin successfully",
      id: user._id,
      username: user.username,
      profilePic: user.profilePic
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;

