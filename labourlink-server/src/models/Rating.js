import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    contractorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contractor',
      required: true
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true
    },
    
    // Mutual ratings
    workerRating: {
      rating: { type: Number, min: 1, max: 5 },
      feedback: String,
      ratedAt: Date
    },
    contractorRating: {
      rating: { type: Number, min: 1, max: 5 },
      feedback: String,
      ratedAt: Date
    },
    
    ratingType: {
      type: String,
      enum: ['mutual', 'worker-to-contractor', 'contractor-to-worker'],
      default: 'mutual'
    },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    collection: 'ratings'
  }
);

export default mongoose.model('Rating', ratingSchema);
