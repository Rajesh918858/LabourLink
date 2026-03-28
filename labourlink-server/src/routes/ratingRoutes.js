import express from 'express';
import protect from '../middleware/auth.js';
import { addRating, getWorkerRatings, getContractorRatings } from '../controllers/ratingController.js';

const router = express.Router();

// Add rating
router.post('/', protect, addRating);

// Get worker ratings
router.get('/worker/:workerId', getWorkerRatings);

// Get contractor ratings
router.get('/contractor/:contractorId', getContractorRatings);

export default router;
