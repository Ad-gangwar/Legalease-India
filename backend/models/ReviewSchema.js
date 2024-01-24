const mongoose=require('mongoose');
const Lawyer=require('./LawyerSchema');

const ReviewSchema = new mongoose.Schema(
  {
    lawyer: {
      type: mongoose.Types.ObjectId,
      ref: "Lawyer",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
    path: "user",
    select: "name photo"
  });
  next();
});

ReviewSchema.statics.calcAvgRatings = async function (lawyerId) {
  const stats = await this.aggregate([
    {
      $match: { lawyer: lawyerId },
    },
    {
      $group: {
        _id: "$lawyer",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    const roundedAvgRating = stats[0].avgRating.toFixed(1);

    await Lawyer.findByIdAndUpdate(lawyerId, {
      totalReviews: stats[0].numOfRating,
      rating: roundedAvgRating, // Round off the average rating to one decimal place
    });
  } else {
    // Handle the case where there are no reviews for the Lawyer
    // You may want to update Lawyer with default values or handle it accordingly
    console.log("No reviews found for the Lawyer.");
  }
};

ReviewSchema.post("save", function () {
  this.constructor.calcAvgRatings(this.lawyer);
});


module.exports= mongoose.model("Review", ReviewSchema);
