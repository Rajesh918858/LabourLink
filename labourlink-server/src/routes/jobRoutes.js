import express from 'express';
import protect, { authorize } from '../middleware/auth.js';
import { createJob, getAllJobs, getJobById, applyForJob, acceptApplication, completeJob, searchJobs } from '../controllers/jobController.js';

const router = express.Router();

// Get all jobs (public)
router.get('/', getAllJobs);

// Get job by ID (public)
router.get('/:id', getJobById);

// Create job (contractor only)
router.post('/', protect, authorize(['contractor']), createJob);

// Apply for job (worker only)
router.post('/apply', protect, authorize(['worker']), applyForJob);

// Accept application (contractor only)
router.put('/accept-application', protect, authorize(['contractor']), acceptApplication);

// Complete job (contractor only)
router.put('/complete/:id', protect, authorize(['contractor']), completeJob);

// Search jobs
router.get('/search', searchJobs);

export default router;
