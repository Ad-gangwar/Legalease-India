const mongoose=require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required:true
    },
    lawyer: {
      type: mongoose.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documents:{
      type: Array,
    },
    fees: { type: String, required: true },
    serviceDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Service", ServiceSchema);
