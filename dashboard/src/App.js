// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

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
import ResolveDisputePageFaculty from './pages/Faculty/ResolveDisputePage';

// Student Pages
import StudentDashboard from './pages/Student/StudentDashboard';
import ViewAttendancePage from './pages/Student/ViewAttendancePage';
import RaiseDisputePage from './pages/Student/RaiseDisputePage';
import ScanQRCodePage from './pages/Student/ScanQRCodePage';

// Not Found
import NotFoundPage from './pages/NotFoundPage';

// Context
import AuthProvider from './contexts/AuthContext';

// Role Guard
import RequireRole from './components/RequireRole';

import AutoLogoutRedirect from './components/AutoLogoutRedirect';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AutoLogoutRedirect />
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <RequireRole allowedRole="admin">
                  <AdminDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/admin/attendance-report"
              element={
                <RequireRole allowedRole="admin">
                  <AttendanceReportPage />
                </RequireRole>
              }
            />
            <Route
              path="/admin/resolve-dispute"
              element={
                <RequireRole allowedRole="admin">
                  <ResolveDisputePageAdmin />
                </RequireRole>
              }
            />
            <Route
              path="/admin/user-management"
              element={
                <RequireRole allowedRole="admin">
                  <UserManagementPage />
                </RequireRole>
              }
            />

            {/* Faculty Routes */}
            <Route
              path="/faculty/dashboard"
              element={
                <RequireRole allowedRole="faculty">
                  <FacultyDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/faculty/mark-attendance"
              element={
                <RequireRole allowedRole="faculty">
                  <MarkAttendancePage />
                </RequireRole>
              }
            />
            <Route
              path="/faculty/resolve-dispute"
              element={
                <RequireRole allowedRole="faculty">
                  <ResolveDisputePageFaculty />
                </RequireRole>
              }
            />

            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <RequireRole allowedRole="student">
                  <StudentDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/student/view-attendance"
              element={
                <RequireRole allowedRole="student">
                  <ViewAttendancePage />
                </RequireRole>
              }
            />
            <Route
              path="/student/raise-dispute"
              element={
                <RequireRole allowedRole="student">
                  <RaiseDisputePage />
                </RequireRole>
              }
            />
            <Route
              path="/student/scanqrcode"
              element={
                <RequireRole allowedRole="student">
                  <ScanQRCodePage />
                </RequireRole>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
