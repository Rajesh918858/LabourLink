import express from 'express';
import { registerWorker, registerContractor, loginWorker, loginContractor } from '../controllers/authController.js';

const router = express.Router();

// Worker auth
router.post('/register-worker', registerWorker);
router.post('/login-worker', loginWorker);

// Contractor auth
router.post('/register-contractor', registerContractor);
router.post('/login-contractor', loginContractor);

export default router;
