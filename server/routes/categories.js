const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json({
      success: true,
      message: "Category successfully created",
      cat: savedCat
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json({
        success: true,
        message: "Get categories successfully",
        cats
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  });

module.exports = router;
