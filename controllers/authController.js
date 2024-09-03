// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// require('dotenv').config();

// exports.signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const user = new User({ username, email, password });
//     await user.save();
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ token });
//   } catch (error) {
//     console.error('Error signing up:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error signing in:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
