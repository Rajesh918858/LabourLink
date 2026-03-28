import Rating from '../models/Rating.js';
import Job from '../models/Job.js';
import Worker from '../models/Worker.js';
import Contractor from '../models/Contractor.js';

// Add rating for a completed job (Mutual ratings)
export const addRating = async (req, res) => {
  try {
    const { jobId, workerId, contractorRating, workerFeedback, workerRating, contractorFeedback } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if rating already exists
    let rating = await Rating.findOne({ jobId, workerId });

    if (!rating) {
      rating = new Rating({
        jobId,
        contractorId: job.contractor,
        workerId
      });
    }

    // Add contractor's rating
    if (contractorRating && workerFeedback) {
      rating.contractorRating = {
        rating: contractorRating,
        feedback: workerFeedback,
        ratedAt: new Date()
      };
    }

    // Add worker's rating (if rating comes from worker)
    if (workerRating && contractorFeedback) {
      rating.workerRating = {
        rating: workerRating,
        feedback: contractorFeedback,
        ratedAt: new Date()
      };
    }

    await rating.save();

    // Update worker's average rating
    const ratings = await Rating.find({ workerId, 'contractorRating.rating': { $exists: true } });
    if (ratings.length > 0) {
      const totalRating = ratings.reduce((sum, r) => sum + (r.contractorRating.rating || 0), 0);
      const averageRating = totalRating / ratings.length;

      await Worker.findByIdAndUpdate(workerId, {
        averageRating: Math.round(averageRating * 10) / 10,
        totalRatings: ratings.length
      });
    }

    // Update contractor's average rating
    const contractorRatings = await Rating.find({ contractorId: job.contractor, 'workerRating.rating': { $exists: true } });
    if (contractorRatings.length > 0) {
      const totalRating = contractorRatings.reduce((sum, r) => sum + (r.workerRating.rating || 0), 0);
      const averageRating = totalRating / contractorRatings.length;

      await Contractor.findByIdAndUpdate(job.contractor, {
        averageRating: Math.round(averageRating * 10) / 10,
        totalRatings: contractorRatings.length
      });
    }

    res.status(200).json({
      message: 'Rating added successfully',
      rating
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding rating', error: error.message });
  }
};

// Get ratings for a worker
export const getWorkerRatings = async (req, res) => {
  try {
    const { workerId } = req.params;

    const ratings = await Rating.find({ workerId })
      .populate('contractorId', 'name companyName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Worker ratings fetched',
      count: ratings.length,
      ratings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings', error: error.message });
  }
};

// Get ratings for a contractor
export const getContractorRatings = async (req, res) => {
  try {
    const { contractorId } = req.params;

    const ratings = await Rating.find({ contractorId })
      .populate('workerId', 'name profilePhoto')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Contractor ratings fetched',
      count: ratings.length,
      ratings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings', error: error.message });
  }
};

export default {
  addRating,
  getWorkerRatings,
  getContractorRatings
};
