import React, { useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './UserManagementPage.css';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const UserManagementPage = () => {
  const allUsers = [
    { id: 1, name: 'Juan Dela Cruz', email: 'juan@email.com', role: 'Student' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'Faculty' },
    { id: 3, name: 'Pedro Reyes', email: 'pedro@email.com', role: 'Admin' },
    { id: 4, name: 'Carlos Tan', email: 'carlos@email.com', role: 'Student' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setCurrentUser(null);
  };

  const handleInputChange = (field, value) => {
    setCurrentUser((prev) => ({ ...prev, [field]: value }));
  };

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  return (
    <RoleLayout>
      <div className="user-management-page">
        <h1 className="user-management-header">User Management</h1>

        <div className="filters">
          <TextField
            label="Search by name or email"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />

          <FormControl className="filter-select">
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="Role"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Faculty">Faculty</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </FormControl>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="action-buttons">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit User Modal */}
        <Dialog open={editModalOpen} onClose={handleCloseModal}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent className="edit-modal-content">
            {currentUser && (
              <>
                <TextField
                  margin="dense"
                  label="Name"
                  fullWidth
                  value={currentUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Email"
                  fullWidth
                  value={currentUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={currentUser.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Faculty">Faculty</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseModal}
              style={{ color: '#555' }} // Neutral/dark gray text for Cancel
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              style={{
                backgroundColor: '#086308',
                color: '#fff',
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </RoleLayout>
  );
};

export default UserManagementPage;
