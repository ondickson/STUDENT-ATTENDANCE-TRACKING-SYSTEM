// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import nvsuLogo from './assets/nvsulogo.jpeg';

// Auth Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import AttendanceReportPage from './pages/Admin/AttendanceReportPage';
import ResolveDisputePageAdmin from './pages/Admin/ResolveDisputePage';
import UserManagementPage from './pages/Admin/UserManagementPage';

// Faculty Pages
import FacultyDashboard from './pages/Faculty/FacultyDashboard';
import MarkAttendancePage from './pages/Faculty/MarkAttendancePage';
import ClassSchedulePageFaculty from './pages/Faculty/ClassSchedulePage';
import ResolveDisputePageFaculty from './pages/Faculty/ResolveDisputePage';

// Student Pages
import StudentDashboard from './pages/Student/StudentDashboard';
import ViewAttendancePage from './pages/Student/ViewAttendancePage';
import RaiseDisputePage from './pages/Student/RaiseDisputePage';
import ClassSchedulePageStudent from './pages/Student/ClassSchedulePage';

// Profile Page
import ProfilePage from './pages/Profile/ProfilePage';

// Not Found
import NotFoundPage from './pages/NotFoundPage';

// Context
import AuthProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* <header className="App-header">
            <img src={nvsuLogo} className="App-logo" alt="NVSU Logo" />
          </header> */}
          <Routes>
            {/* Auth */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/attendance-report" element={<AttendanceReportPage />} />
            <Route path="/admin/resolve-dispute" element={<ResolveDisputePageAdmin />} />
            <Route path="/admin/user-management" element={<UserManagementPage />} />

            {/* Faculty */}
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/mark-attendance" element={<MarkAttendancePage />} />
            <Route path="/faculty/class-schedule" element={<ClassSchedulePageFaculty />} />
            <Route path="/faculty/resolve-dispute" element={<ResolveDisputePageFaculty />} />

            {/* Student */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/view-attendance" element={<ViewAttendancePage />} />
            <Route path="/student/raise-dispute" element={<RaiseDisputePage />} />
            <Route path="/student/class-schedule" element={<ClassSchedulePageStudent />} />

            {/* Profile */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
