
import express from 'express';
import { getAllAttendanceWithStudents, markAttendance, getAttendanceByDate, getAttendanceStats } from '../controllers/attendanceController.js';

const router = express.Router();

// GET /api/attendance/report
router.get('/report', getAllAttendanceWithStudents);
router.post('/mark', markAttendance);
router.get('/by-date', getAttendanceByDate);
router.get('/stats/:userId', getAttendanceStats);

export default router;
