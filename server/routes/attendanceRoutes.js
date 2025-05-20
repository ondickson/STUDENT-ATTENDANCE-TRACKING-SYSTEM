
import express from 'express';
import { getAllAttendanceWithStudents, markAttendance, getAttendanceByDate, getAttendanceStats, getAttendanceByUser, deleteAttendanceEntry, markAttendanceViaQR } from '../controllers/attendanceController.js';

const router = express.Router();

// GET /api/attendance/report
router.get('/report', getAllAttendanceWithStudents);
router.post('/mark', markAttendance);
router.get('/by-date', getAttendanceByDate);
router.get('/stats/:userId', getAttendanceStats);
router.get('/:userId', getAttendanceByUser);
router.delete('/', deleteAttendanceEntry);
router.post('/mark-via-qr', markAttendanceViaQR);


export default router;
