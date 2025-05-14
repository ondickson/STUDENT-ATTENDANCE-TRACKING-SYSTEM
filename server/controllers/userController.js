import User from '../models/User.js';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    console.log('[userController] Fetched users:', users);
    res.status(200).json(users);
  } catch (err) {
    console.error('[userController] Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// (Optional) Create/register user from frontend form (Add User Modal)
// export const registerUser = async (req, res) => {
//   const { fullName, email, role, year, course, password } = req.body;

//   if (!fullName || !email || !role || !password) {
//     return res.status(400).json({ message: 'Full name, email, role, and password are required' });
//   }

//   // Students require year and course
//   if (role === 'student' && (!year || !course)) {
//     return res.status(400).json({ message: 'Year and course are required for students' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }

//     const newUser = new User({
//       fullName,
//       email,
//       password, // You should hash this if you're not already
//       role,
//       year: role === 'student' ? year : undefined,
//       course: role === 'student' ? course : undefined,
//     });

//     const savedUser = await newUser.save();
//     // console.log('✅ New user created:', savedUser);
//     res.status(201).json({ message: 'User created successfully', user: savedUser });
//   } catch (error) {
//     // console.error('❌ Error creating user:', error);
//     res.status(500).json({ message: 'Server error during user creation' });
//   }
// };

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
