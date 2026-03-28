import express from 'express';
import protect, { authorize } from '../middleware/auth.js';
import { getContractorProfile, updateContractorProfile, getContractorDashboard, addFavoriteWorker, getFavoriteWorkers } from '../controllers/contractorController.js';

const router = express.Router();

// Get profile (protected)
router.get('/profile', protect, getContractorProfile);

// Update profile (protected)
router.put('/profile', protect, updateContractorProfile);

// Get dashboard (contractor only)
router.get('/dashboard', protect, authorize(['contractor']), getContractorDashboard);

// Add favorite worker
router.post('/favorite-worker', protect, authorize(['contractor']), addFavoriteWorker);

// Get favorite workers
router.get('/favorite-workers', protect, authorize(['contractor']), getFavoriteWorkers);

export default router;
