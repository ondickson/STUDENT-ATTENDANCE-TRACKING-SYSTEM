import express from 'express';
import { getAllUsers, registerUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users
router.get('/', getAllUsers);

// Optional: POST route if you want to support user creation
router.post('/', registerUser);

// NEW: Update user by ID
router.put('/:id', updateUser);

// NEW: Delete user by ID
router.delete('/:id', deleteUser);


export default router;
