import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide worker name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
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
    location: {
      city: String,
      state: String,
      coordinates: {
        type: { type: String, enum: ['Point'] },
        coordinates: [Number]
      }
    },
    profilePhoto: {
      type: String,
      default: null
    },
    primarySkill: String,
    skillsCategory: [String],
    
    // Work history
    completedJobs: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    jobHistory: [{
      jobId: mongoose.Schema.Types.ObjectId,
      completedDate: Date,
      earnings: Number,
      contractorRating: Number,
      status: { type: String, enum: ['completed', 'rejected'] }
    }],
    
    // Ratings and reviews
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
    
    // Skill endorsements
    endorsements: [{
      skill: String,
      endorsedBy: mongoose.Schema.Types.ObjectId,
      endorsedAt: { type: Date, default: Date.now },
      count: { type: Number, default: 1 }
    }],
    
    // Account status
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationDocuments: [String],
    isActive: {
      type: Boolean,
      default: true
    },
    
    // Additional fields for optional features
    voiceProfileEnabled: { type: Boolean, default: false },
    emergencyJobNotificationEnabled: { type: Boolean, default: true },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    collection: 'workers'
  }
);

// Create geospatial index for location-based search
workerSchema.index({ 'location.coordinates': '2dsphere' });
workerSchema.index({ email: 1 });
workerSchema.index({ phone: 1 });

export default mongoose.model('Worker', workerSchema);
