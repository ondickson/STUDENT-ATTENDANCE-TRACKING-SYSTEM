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
  // console.log('Fetching attendance stats for userId:', userId);
  try {
    const attendanceRecords = await Attendance.find({ userId });
    // console.log('Attendance records found:', attendanceRecords.length);

    const totalClasses = attendanceRecords.length;
    const attended = attendanceRecords.filter(a => a.status === 'present').length;
    const absences = attendanceRecords.filter(a => a.status === 'absent').length;

    res.json({ totalClasses, attended, absences });
  } catch (err) {
    console.error('❌ Error fetching stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAttendanceByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const records = await Attendance.find({ userId }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance records' });
  }
};


export const deleteAttendanceEntry = async (req, res) => {
  try {
    const { userId, date } = req.body;
    if (!userId || !date) {
      return res.status(400).json({ message: 'userId and date are required' });
    }

    // Create start and end of the day for the given date
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const deleted = await Attendance.findOneAndDelete({
      userId,
      date: { $gte: start, $lte: end },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({ message: 'Attendance entry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting attendance' });
  }
};

export const markAttendanceViaQR = async (req, res) => {
  const { userId, sessionId } = req.body;

  if (!userId || !sessionId) {
    return res.status(400).json({ message: "userId and sessionId are required." });
  }

  const date = new Date().toISOString().split("T")[0];

  try {
    const existing = await Attendance.findOne({ userId, date });
    if (existing) {
      return res.status(400).json({ message: "Attendance already marked for today." });
    }

    const newRecord = await Attendance.create({
      userId,
      session: sessionId,
      date,
      status: "present",
    });

    console.log(`✅ QR attendance marked for user ${userId}, session ${sessionId}`);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("❌ Error marking QR attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};


