import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      enum: [
        'BSA',
        'BSMath',
        'BSCS',
        'BSIT',
        'BSAgrib',
        'BSBA',
        'BSCE',
        'BSHM',
        'BSF',
        'BPEd',
      ],
    },
    year: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      default: 'student',
    },
  },
  { timestamps: true }
);


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('🔐 Password hashed before save');
    next();
  } catch (err) {
    return next(err);
  }
});

// ✅ Add this in User.js to enable virtual population of attendance
userSchema.virtual('attendance', {
  ref: 'Attendance',
  localField: '_id',
  foreignField: 'userId',
});

// ✅ Required to include virtuals in output
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);
export default User;
