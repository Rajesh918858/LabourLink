import express from 'express';
import protect from '../middleware/auth.js';
import { getWorkerProfile, updateWorkerProfile, getWorkerById, searchWorkers, addSkillEndorsement } from '../controllers/workerController.js';

const router = express.Router();

// Get profile (protected)
router.get('/profile', protect, getWorkerProfile);

// Update profile (protected)
router.put('/profile', protect, updateWorkerProfile);

// Get worker by ID (public)
router.get('/:id', getWorkerById);

// Search workers
router.get('/search', searchWorkers);

// Add skill endorsement
router.post('/endorse', protect, addSkillEndorsement);

export default router;
