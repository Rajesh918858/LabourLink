import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: [true, 'Please provide skill name'],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['masonry', 'carpentry', 'electrical', 'plumbing', 'painting', 'mechanical', 'general'],
      required: true
    },
    description: String,
    certificationRequired: Boolean,
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    collection: 'skills'
  }
);

export default mongoose.model('Skill', skillSchema);
