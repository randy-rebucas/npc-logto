var express = require("express");
var router = express.Router();
const { getMembers, getMember, createMember, updateMember, deleteMember } = require("../controllers/members");
const hook = require("../middleware/hook");

router.get("/", getMembers);
router.get("/:id", getMember);
router.post("/", hook, createMember);
router.put("/:id", hook, updateMember);
router.delete("/:id", hook, deleteMember);

module.exports = router;
