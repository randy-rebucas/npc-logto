var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const { getUsers, getUser, createUser, updateUser, deleteUser, getUserByEmail, profile } = require("../controllers/users");

/* GET users listing. */
router.get("/", getUsers);
// Get user profile route (protected)
router.get("/profile", auth, profile);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
