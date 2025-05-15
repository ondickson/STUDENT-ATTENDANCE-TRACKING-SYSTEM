// controllers/attendanceController.js

import User from '../models/User.js';
import Attendance from '../models/Attendance.js';

/**
 * GET /api/attendance/report
 * Fetch all students and their attendance records
 */
export const getAllAttendanceWithStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).populate({
      path: 'attendance',
      options: { sort: { date: 1 } }, // optional: sort attendance by date
    });

    console.log(`📊 Returning ${students.length} students with attendance`);

    res.status(200).json(students);
  } catch (err) {
    console.error('❌ Error fetching attendance report:', err);
    res.status(500).json({ message: 'Server error while fetching attendance report' });
  }
};

/**
 * POST /api/attendance/mark
 * Mark attendance for multiple users for a specific date
 * Expects req.body = [{ userId, date, status }, ...]
 */
export const markAttendance = async (req, res) => {
  try {
    const records = req.body;

    const saved = await Promise.all(
      records.map(async ({ userId, date, status }) => {
        // Ensure unique entry per user per date by deleting existing
        await Attendance.findOneAndDelete({ userId, date });

        const newAttendance = new Attendance({
          userId,
          date,
          status,
        });

        return await newAttendance.save();
      })
    );

    console.log(`✅ Marked attendance for ${saved.length} records`);

    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Error marking attendance:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};
