const mongoose=require('mongoose');

const LawyerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photo: { 
    type: String 
  },
  phone: {
    type: Number
  },
  fees: {
    type: Number
  },
  role: {
    type: String,
  },

  // Fields for Lawyers only
  specialization: {
    type: String
  },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: {
    type: String,
    maxLength: 50
  },
  about: {
    type: String
  },
  reviews: [{
    type: mongoose.Types.ObjectId,
    ref: "Review"
  }],
  rating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  ServiceReq: [{
    type: mongoose.Types.ObjectId,
    ref: "Service"
  }],
});

module.exports= mongoose.model("Lawyer", LawyerSchema);
