import User from '../models/User.js';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    // console.log('[userController] Fetched users:', users);
    res.status(200).json(users);
  } catch (err) {
    console.error('[userController] Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, year, course } = req.body;

    // Only require year and course for student role
    if (role === 'student' && (!year || !course)) {
      return res.status(400).json({ message: 'Year and course are required for students' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      role,
      ...(role === 'student' && { year, course }) // conditionally include fields
    });

    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    // console.log('📄 Students fetched:', students.length);
    res.status(200).json(students);
  } catch (err) {
    console.error('❌ Error fetching students:', err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};


export const getStudentsWithAttendance = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .populate({
        path: 'attendance',
        model: 'Attendance',
        select: 'date status -_id',
      })
      .select('-password');
    res.json(students);
  } catch (err) {
    // console.error('Error fetching students with attendance:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
