const mongoose=require('mongoose');
const Service = require("./ServiceSchema");

const ServiceProviderSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  address: {
    type: String
  },
  photo: { 
    type: String 
  },
  phone: {
    type: String
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
  organisation: {
    type: String
  },
  
  qualifications: {
    type: Array,
  },

  casesHandled: {
    type: Number,
    default: 0
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

// Method to update casesHandled based on approved service requests
ServiceProviderSchema.methods.updateCasesHandled = async function () {
  try {
    const approvedRequestsCount = await Service.countDocuments({
      serviceProvider: this._id, // Match the current service provider
      status: 'approved',
    });

    // Update the casesHandled field
    this.casesHandled = approvedRequestsCount;
    await this.save();

    console.log(`Cases handled for service provider ${this.name} updated to ${approvedRequestsCount}`);
  } catch (error) {
    console.error('Error updating casesHandled:', error);
    throw error;
  }
};

module.exports= mongoose.model("ServiceProvider", ServiceProviderSchema);
