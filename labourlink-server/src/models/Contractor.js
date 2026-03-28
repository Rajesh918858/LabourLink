import mongoose from 'mongoose';

const contractorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide contractor name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
      select: false
    },
    companyName: String,
    companyLicense: String,
    
    location: {
      city: String,
      state: String,
      coordinates: {
        type: { type: String, enum: ['Point'] },
        coordinates: [Number]
      }
    },
    
    profilePhoto: String,
    
    // Contractor stats
    totalJobsPosted: {
      type: Number,
      default: 0
    },
    totalJobsCompleted: {
      type: Number,
      default: 0
    },
    activeJobs: {
      type: Number,
      default: 0
    },
    
    // Ratings
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    
    // Worker relationships
    favoriteWorkers: [
      {
        workerId: mongoose.Schema.Types.ObjectId,
        addedAt: { type: Date, default: Date.now }
      }
    ],
    
    // Payments and finances
    totalSpent: {
      type: Number,
      default: 0
    },
    currency: { type: String, default: 'INR' },
    
    isVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    collection: 'contractors'
  }
);

// Create geospatial index
contractorSchema.index({ 'location.coordinates': '2dsphere' });
contractorSchema.index({ email: 1 });

export default mongoose.model('Contractor', contractorSchema);
