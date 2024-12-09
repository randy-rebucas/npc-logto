var express = require("express");
var router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, getUserByEmail } = require("../controllers/users");

/* GET users listing. */
router.get("/", getUsers);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
