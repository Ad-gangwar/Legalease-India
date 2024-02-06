const mongoose = require('mongoose');
const ServiceProvider = require('./ServiceProviderSchema');

const ReviewSchema = new mongoose.Schema(
  {
    serviceProvider: {
      type: mongoose.Types.ObjectId,
      ref: "ServiceProvider",
    },
    client: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "client",
    select: "name photo"
  });
  next();
});

ReviewSchema.statics.calcAvgRatings = async function (serviceProviderId) {
  const stats = await this.aggregate([
    {
      $match: { serviceProvider: serviceProviderId },
    },
    {
      $group: {
        _id: "$serviceProvider",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    const roundedAvgRating = parseFloat(stats[0].avgRating.toFixed(1)); // Convert to number

    await ServiceProvider.findByIdAndUpdate(serviceProviderId, {
      totalReviews: stats[0].numOfRating,
      rating: roundedAvgRating,
    });
  } else {
    console.log("No reviews found for the Service Provider.");
  }
};


ReviewSchema.post("save", function () {
  this.constructor.calcAvgRatings(this.serviceProvider);
});


module.exports = mongoose.model("Review", ReviewSchema);
