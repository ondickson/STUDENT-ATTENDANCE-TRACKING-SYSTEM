import React, { useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './ClassSchedulePage.css';
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal,
  Box,
  TextField,
} from '@mui/material';

const ClassSchedulePage = () => {
  const [course, setCourse] = useState('');
  const [schedule, setSchedule] = useState([
    { id: 1, course: 'BSIT', day: 'Monday', time: '10:00 AM - 12:00 PM' },
    { id: 2, course: 'BSCS', day: 'Tuesday', time: '1:00 PM - 3:00 PM' },
    { id: 3, course: 'BSEd', day: 'Wednesday', time: '9:00 AM - 11:00 AM' },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleEditClick = (scheduleItem) => {
    setCurrentSchedule(scheduleItem);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSchedule(null);
  };

  const handleSaveChanges = () => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) =>
        item.id === currentSchedule.id ? currentSchedule : item
      )
    );
    handleCloseModal();
  };

  return (
    <RoleLayout>
      <div className="class-schedule-page">
        <h1 className="class-schedule-header">Class Schedule</h1>

        <FormControl className="course-select">
          <InputLabel>Course</InputLabel>
          <Select value={course} onChange={handleCourseChange} label="Course">
            <MenuItem value="BSIT">BSIT</MenuItem>
            <MenuItem value="BSCS">BSCS</MenuItem>
            <MenuItem value="BSEd">BSEd</MenuItem>
          </Select>
        </FormControl>

        <div className="schedule-table">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Day</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.id}>
                  <td>{item.course}</td>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          variant="contained"
          className="add-schedule-button"
          style={{
            backgroundColor: '#086308',
            color: '#fff',
          }}
        >
          Add New Schedule
        </Button>

        {/* Edit Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="edit-schedule-modal"
          aria-describedby="modal-to-edit-class-schedule"
        >
          <Box className="modal-box">
            <h2>Edit Class Schedule</h2>
            {currentSchedule && (
              <div>
                <TextField
                  label="Course"
                  variant="outlined"
                  fullWidth
                  value={currentSchedule.course}
                  onChange={(e) =>
                    setCurrentSchedule({
                      ...currentSchedule,
                      course: e.target.value,
                    })
                  }
                  margin="normal"
                />
                <TextField
                  label="Day"
                  variant="outlined"
                  fullWidth
                  value={currentSchedule.day}
                  onChange={(e) =>
                    setCurrentSchedule({ ...currentSchedule, day: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  label="Time"
                  variant="outlined"
                  fullWidth
                  value={currentSchedule.time}
                  onChange={(e) =>
                    setCurrentSchedule({ ...currentSchedule, time: e.target.value })
                  }
                  margin="normal"
                />

                <div className="modal-actions">
                  <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="success" onClick={handleSaveChanges}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </RoleLayout>
  );
};

export default ClassSchedulePage;
