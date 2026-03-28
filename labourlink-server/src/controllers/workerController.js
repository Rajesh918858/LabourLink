import Worker from '../models/Worker.js';

// Get worker profile
export const getWorkerProfile = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json({
      message: 'Worker profile fetched',
      worker
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update worker profile
export const updateWorkerProfile = async (req, res) => {
  try {
    const { name, phone, location, primarySkill, skillsCategory } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;
    if (primarySkill) updateData.primarySkill = primarySkill;
    if (skillsCategory) updateData.skillsCategory = skillsCategory;

    const worker = await Worker.findByIdAndUpdate(req.user, updateData, { new: true });

    res.status(200).json({
      message: 'Profile updated successfully',
      worker
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Get worker by ID (for viewing worker profile)
export const getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const publicProfile = {
      _id: worker._id,
      name: worker.name,
      location: worker.location,
      primarySkill: worker.primarySkill,
      skillsCategory: worker.skillsCategory,
      completedJobs: worker.completedJobs,
      averageRating: worker.averageRating,
      totalRatings: worker.totalRatings,
      endorsements: worker.endorsements,
      profilePhoto: worker.profilePhoto,
      isVerified: worker.isVerified,
      jobHistory: worker.jobHistory
    };

    res.status(200).json({
      message: 'Worker profile fetched',
      worker: publicProfile
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching worker', error: error.message });
  }
};

// Search workers by location and skills
export const searchWorkers = async (req, res) => {
  try {
    const { location, skills } = req.query;
    const query = { isActive: true };

    if (location) {
      // Parse latitude and longitude from location query
      const coords = location.split(',').map(Number);
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coords
          },
          $maxDistance: 5000 // 5km radius
        }
      };
    }

    if (skills) {
      query.skillsCategory = { $in: skills.split(',') };
    }

    const workers = await Worker.find(query).limit(20);

    res.status(200).json({
      message: 'Workers found',
      count: workers.length,
      workers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching workers', error: error.message });
  }
};

// Add skill endorsement
export const addSkillEndorsement = async (req, res) => {
  try {
    const { workerId, skill } = req.body;

    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Check if endorsement already exists
    const existingEndorsement = worker.endorsements.find(e => e.skill === skill);

    if (existingEndorsement) {
      existingEndorsement.count += 1;
    } else {
      worker.endorsements.push({
        skill,
        endorsedBy: req.user,
        endorsedAt: new Date(),
        count: 1
      });
    }

    await worker.save();

    res.status(200).json({
      message: 'Skill endorsement added',
      worker
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding endorsement', error: error.message });
  }
};

export default {
  getWorkerProfile,
  updateWorkerProfile,
  getWorkerById,
  searchWorkers,
  addSkillEndorsement
};
