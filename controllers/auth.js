const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid login credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


