
import express from 'express';
import { getAllAttendanceWithStudents, markAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

// GET /api/attendance/report
router.get('/report', getAllAttendanceWithStudents);
router.post('/mark', markAttendance);

export default router;
