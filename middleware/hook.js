const Member = require('../models/Member');

const hook = async (req, res, next) => {
    try {
        const member = new Member(req.body);
        await member.save();

        req.member = member;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = hook; 