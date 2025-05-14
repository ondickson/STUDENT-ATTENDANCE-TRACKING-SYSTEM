// controllers/authController.js
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  console.log('🔵 Incoming registration request:', req.body);

  try {
    const { fullName, email, password, course, year } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
    //   console.log('⚠️ Email already exists');
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      course,
      year,
    });

    await newUser.save();
    // console.log('✅ New user registered:', newUser.email);

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    // console.error('❌ Registration failed:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt for:', email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Incorrect password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log(`✅ Login successful for ${email} as ${user.role}`);
    res.status(200).json({
      token,
      role: user.role,
    });

  } catch (error) {
    console.error('⚠️ Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
