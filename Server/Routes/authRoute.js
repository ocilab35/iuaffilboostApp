import express from 'express';
import { register, login, approveUser, rejectUser, getUnapprovedUsers } from '../Conroler/authControler.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Admin approval and rejection routes
router.patch('/approve/:userId', approveUser);  // Admin approves a user
router.patch('/reject/:userId', rejectUser);    // Admin rejects a user

// Admin fetch unapproved users
router.get('/unapproved-users', getUnapprovedUsers); // Fetch unapproved users

export default router;
