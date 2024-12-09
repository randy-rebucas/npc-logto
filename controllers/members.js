const Member = require('../models/Member');

exports.getMembers = async (req, res) => {
    res.json({ message: 'Members' });
}

exports.getMember = async (req, res) => {
    res.json({ message: 'Member' });
}

exports.createMember = async (req, res) => {
    const member = req.member;
    console.log(member)
    res.status(201).json({ member })
}

exports.updateMember = async (req, res) => {
    const member = req.member;
    console.log(member)
    res.status(201).json({ member })
}

exports.deleteMember = async (req, res) => {
    const member = req.member;
    console.log(member)
    res.status(201).json({ member });
}


