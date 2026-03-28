import Contractor from '../models/Contractor.js';
import Job from '../models/Job.js';

// Get contractor profile
export const getContractorProfile = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.user);
    if (!contractor) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    res.status(200).json({
      message: 'Contractor profile fetched',
      contractor
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update contractor profile
export const updateContractorProfile = async (req, res) => {
  try {
    const { name, phone, companyName, location } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (companyName) updateData.companyName = companyName;
    if (location) updateData.location = location;

    const contractor = await Contractor.findByIdAndUpdate(req.user, updateData, { new: true });

    res.status(200).json({
      message: 'Profile updated successfully',
      contractor
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Get contractor dashboard
export const getContractorDashboard = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.user);
    if (!contractor) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    const activeJobs = await Job.find({ contractor: req.user, status: 'in-progress' });
    const completedJobs = await Job.find({ contractor: req.user, status: 'completed' });
    const totalSpent = completedJobs.reduce((sum, job) => sum + (job.budget.totalBudget || 0), 0);

    res.status(200).json({
      message: 'Dashboard data fetched',
      dashboard: {
        contractor: {
          name: contractor.name,
          companyName: contractor.companyName,
          averageRating: contractor.averageRating,
          totalRatings: contractor.totalRatings
        },
        stats: {
          totalJobsPosted: contractor.totalJobsPosted,
          activeJobs: activeJobs.length,
          completedJobs: contractor.totalJobsCompleted,
          totalSpent: totalSpent,
          favoriteWorkersCount: contractor.favoriteWorkers.length
        },
        recentJobs: activeJobs.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard', error: error.message });
  }
};

// Add worker to favorites
export const addFavoriteWorker = async (req, res) => {
  try {
    const { workerId } = req.body;

    const contractor = await Contractor.findById(req.user);
    if (!contractor) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    // Check if already in favorites
    const alreadyFavorite = contractor.favoriteWorkers.find(w => w.workerId.toString() === workerId.toString());
    if (alreadyFavorite) {
      return res.status(400).json({ message: 'Worker already in favorites' });
    }

    contractor.favoriteWorkers.push({ workerId });
    await contractor.save();

    res.status(200).json({
      message: 'Worker added to favorites',
      contractor
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding favorit e worker', error: error.message });
  }
};

// Get contractor's favorite workers
export const getFavoriteWorkers = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.user).populate('favoriteWorkers.workerId');
    if (!contractor) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    res.status(200).json({
      message: 'Favorite workers fetched',
      favoriteWorkers: contractor.favoriteWorkers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite workers', error: error.message });
  }
};

export default {
  getContractorProfile,
  updateContractorProfile,
  getContractorDashboard,
  addFavoriteWorker,
  getFavoriteWorkers
};
