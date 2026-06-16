const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controller/adminctl");
const  protect  = require("../middleware/auth");

// Login
router.post("/login", loginAdmin);

// Protected Example
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

module.exports = router;