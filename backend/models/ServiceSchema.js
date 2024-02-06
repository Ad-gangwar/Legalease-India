const mongoose=require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required:true
    },
    serviceProvider: {
      type: mongoose.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
    client: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
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
