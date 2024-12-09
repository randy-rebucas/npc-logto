const express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const { register, login, profile } = require("../controllers/auth");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Get user profile route (protected)
router.get("/profile", auth, profile);

module.exports = router;
