import Job from '../models/Job.js';
import Worker from '../models/Worker.js';
import Contractor from '../models/Contractor.js';

// Create job (Contractor only)
export const createJob = async (req, res) => {
  try {
    const { title, description, skillsRequired, location, jobType, duration, workersNeeded, budget, isUrgent } = req.body;

    const job = new Job({
      title,
      description,
      skillsRequired,
      location,
      jobType,
      duration,
      workersNeeded,
      budget,
      contractor: req.user,
      isUrgent: isUrgent || false
    });

    await job.save();

    // Update contractor stats
    await Contractor.findByIdAndUpdate(req.user, { $inc: { totalJobsPosted: 1, activeJobs: 1 } });

    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const { status = 'open', sortBy = 'createdAt' } = req.query;
    const query = { status };

    const jobs = await Job.find(query)
      .populate('contractor', 'name companyName averageRating')
      .sort({ [sortBy]: -1 })
      .limit(50);

    res.status(200).json({
      message: 'Jobs fetched',
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('contractor', 'name companyName phone email averageRating')
      .populate('assignedWorkers.workerId', 'name primarySkill averageRating completed Jobs');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({
      message: 'Job fetched',
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
};

// Apply for job (Worker only)
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const alreadyApplied = job.applicants.find(app => app.workerId.toString() === req.user.toString());
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    job.applicants.push({
      workerId: req.user,
      appliedAt: new Date(),
      status: 'pending'
    });

    await job.save();

    res.status(200).json({
      message: 'Application submitted',
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Error applying for job', error: error.message });
  }
};

// Accept application (Contractor only)
export const acceptApplication = async (req, res) => {
  try {
    const { jobId, workerId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update applicant status
    const applicant = job.applicants.find(app => app.workerId.toString() === workerId.toString());
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    applicant.status = 'accepted';

    // Add to assigned workers
    job.assignedWorkers.push({
      workerId,
      assignedAt: new Date(),
      status: 'assigned'
    });

    await job.save();

    res.status(200).json({
      message: 'Worker accepted for job',
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting application', error: error.message });
  }
};

// Complete job (Contractor marks as completed)
export const completeJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = 'completed';

    // Update assigned workers status
    job.assignedWorkers.forEach(worker => {
      worker.status = 'completed';
    });

    await job.save();

    // Update contractor stats
    const contractor = await Contractor.findById(job.contractor);
    contractor.totalJobsCompleted += 1;
    contractor.activeJobs -= 1;
    await contractor.save();

    res.status(200).json({
      message: 'Job completed',
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Error completing job', error: error.message });
  }
};

// Search jobs by location and skills
export const searchJobs = async (req, res) => {
  try {
    const { location, skills, radius = 5 } = req.query;
    const query = { status: 'open' };

    if (location) {
      const coords = location.split(',').map(Number);
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coords
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      };
    }

    if (skills) {
      query['skillsRequired.skillName'] = { $in: skills.split(',') };
    }

    const jobs = await Job.find(query)
      .populate('contractor', 'name companyName averageRating')
      .limit(50);

    res.status(200).json({
      message: 'Jobs found',
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching jobs', error: error.message });
  }
};

export default {
  createJob,
  getAllJobs,
  getJobById,
  applyForJob,
  acceptApplication,
  completeJob,
  searchJobs
};
