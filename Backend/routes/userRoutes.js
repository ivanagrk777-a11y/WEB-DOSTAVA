import express from 'express';

const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// Register user & get all users
router
    .route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);

// Login user
router.post('/login', authUser);

// Logout user
router.post('/logout', logoutUser);

// User profile
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// Admin user routes
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;