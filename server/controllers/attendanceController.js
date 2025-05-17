// controllers/attendanceController.js

import User from '../models/User.js';
import Attendance from '../models/Attendance.js';

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

export const getAttendanceByDate = async (req, res) => {
  const { date } = req.query;
  try {
    const records = await Attendance.find({ date });
    res.status(200).json(records);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ message: 'Failed to fetch attendance' });
  }
};

export const getAttendanceStats = async (req, res) => {
  const { userId } = req.params;
  console.log('Fetching attendance stats for userId:', userId);
  try {
    const attendanceRecords = await Attendance.find({ userId });
    console.log('Attendance records found:', attendanceRecords.length);

    const totalClasses = attendanceRecords.length;
    const attended = attendanceRecords.filter(a => a.status === 'present').length;
    const absences = attendanceRecords.filter(a => a.status === 'absent').length;

    res.json({ totalClasses, attended, absences });
  } catch (err) {
    console.error('❌ Error fetching stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


