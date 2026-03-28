import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide job description']
    },
    skillsRequired: [{
      skillName: String,
      level: { type: String, enum: ['beginner', 'intermediate', 'expert'] }
    }],
    
    location: {
      city: String,
      state: String,
      address: String,
      coordinates: {
        type: { type: String, enum: ['Point'] },
        coordinates: [Number]
      }
    },
    
    jobType: {
      type: String,
      enum: ['daily', 'weekly', 'project'],
      default: 'daily'
    },
    
    duration: {
      startDate: { type: Date, required: true },
      endDate: Date,
      estimatedDays: Number
    },
    
    workersNeeded: {
      type: Number,
      required: true,
      min: 1
    },
    
    budget: {
      dailyRate: { type: Number, required: true },
      totalBudget: Number,
      currency: { type: String, default: 'INR' }
    },
    
    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contractor',
      required: true
    },
    
    status: {
      type: String,
      enum: ['open', 'in-progress', 'completed', 'cancelled'],
      default: 'open'
    },
    
    // Applied and assigned workers
    applicants: [{
      workerId: mongoose.Schema.Types.ObjectId,
      appliedAt: { type: Date, default: Date.now },
      status: { type: String, enum: ['pending', 'accepted', 'rejected'] }
    }],
    
    assignedWorkers: [{
      workerId: mongoose.Schema.Types.ObjectId,
      assignedAt: { type: Date, default: Date.now },
      status: { type: String, enum: ['assigned', 'completed', 'abandoned'] }
    }],
    
    ratings: [{
      workerId: mongoose.Schema.Types.ObjectId,
      rating: { type: Number, min: 1, max: 5 },
      feedback: String,
      ratedAt: { type: Date, default: Date.now }
    }],
    
    isUrgent: { type: Boolean, default: false },
    photoEvidence: [String],
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    collection: 'jobs'
  }
);

// Create geospatial index
jobSchema.index({ 'location.coordinates': '2dsphere' });
jobSchema.index({ status: 1, isUrgent: 1 });

export default mongoose.model('Job', jobSchema);
