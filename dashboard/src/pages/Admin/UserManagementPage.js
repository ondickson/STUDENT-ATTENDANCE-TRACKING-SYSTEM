import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    role: '',
    year: '',
    course: '',
    password: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentUser(null);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    setNewUser({
      fullName: '',
      email: '',
      role: '',
      year: '',
      course: '',
      password: '',
    });
  };

  const handleInputChange = (field, value, isEdit = false) => {
    if (isEdit) {
      setCurrentUser((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveNewUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const payload = { ...newUser };
      if (payload.role !== 'student') {
        delete payload.year;
        delete payload.course;
      }

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUsers((prev) => [...prev, data.user]);
        handleCloseAddModal();
      } else {
        console.error('Error adding user:', data);
        alert(data.message || 'Failed to add user');
      }
    } catch (err) {
      console.error('Network error:', err);
    }
    
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`,
      );
      if (response.status === 200) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleSaveEditUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${currentUser._id}`,
        currentUser,
      );
      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((u) => (u._id === currentUser._id ? response.data : u)),
        );
        handleCloseEditModal();
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  return (
    <RoleLayout>
      <div className="user-management-page">
        <h1 className="user-management-header">User Management</h1>

        <div className="filters">
          {/* <TextField
            label="Search by name or email"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          /> */}
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
            autoComplete="off" // Ensure no autocomplete
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '300px',
            }}
          />

          <FormControl className="filter-select">
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="Role"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="faculty">Faculty</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            style={{
              backgroundColor: '#086308',
              color: '#fff',
              marginLeft: 'auto',
            }}
            onClick={() => {
              setSearchTerm('');
              setAddModalOpen(true);
            }}
          >
            Add New User
          </Button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Year</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.role === 'student' ? user.year : '-'}</td>
                  <td>{user.role === 'student' ? user.course : '-'}</td>
                  <td className="action-buttons">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit User Modal */}
        <Dialog open={editModalOpen} onClose={handleCloseEditModal}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {currentUser && (
              <>
                <TextField
                  margin="dense"
                  label="Name"
                  fullWidth
                  value={currentUser.fullName}
                  onChange={(e) =>
                    handleInputChange('fullName', e.target.value, true)
                  }
                />
                <TextField
                  margin="dense"
                  label="Email"
                  fullWidth
                  value={currentUser.email}
                  onChange={(e) =>
                    handleInputChange('email', e.target.value, true)
                  }
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={currentUser.role}
                    onChange={(e) =>
                      handleInputChange('role', e.target.value, true)
                    }
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="faculty">Faculty</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>
                </FormControl>

                {currentUser.role === 'student' && (
                  <>
                    <TextField
                      select
                      label="Course"
                      margin="dense"
                      fullWidth
                      value={currentUser.course || ''}
                      onChange={(e) =>
                        handleInputChange('course', e.target.value, true)
                      }
                    >
                      {[
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
                      ].map((course) => (
                        <MenuItem key={course} value={course}>
                          {course}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      label="Year Level"
                      margin="dense"
                      fullWidth
                      value={currentUser.year || ''}
                      onChange={(e) =>
                        handleInputChange('year', e.target.value, true)
                      }
                    >
                      {[1, 2, 3, 4].map((year) => (
                        <MenuItem key={year} value={year}>
                          {`${year}st Year`}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal}>Cancel</Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#086308', color: '#fff' }}
              onClick={handleSaveEditUser}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add User Modal */}
        <Dialog open={addModalOpen} onClose={handleCloseAddModal}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={newUser.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={newUser.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={newUser.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>

            {newUser.role === 'student' && (
              <>
                <TextField
                  select
                  label="Course"
                  margin="dense"
                  fullWidth
                  value={newUser.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                >
                  {[
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
                  ].map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Year Level"
                  margin="dense"
                  fullWidth
                  value={newUser.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                >
                  {[1, 2, 3, 4].map((year) => (
                    <MenuItem key={year} value={year}>
                      {`${year}st Year`}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveNewUser}
              style={{ backgroundColor: '#086308', color: '#fff' }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </RoleLayout>
  );
};

export default UserManagementPage;
