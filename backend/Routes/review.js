const express=require('express');
const passport=require('passport');
const router = express.Router({mergeParams: true});
const Review=require('../models/ReviewSchema');
const ServiceProvider=require('../models/ServiceProviderSchema');
const { restrict } =  require( '../utils/helpers');

const getAllReviews=async(req, res)=>{
    try{
        const reviews=await Review.find({});

        res.status(200).json({success: true, messsage: "Successful", data: reviews});
    }
    catch(err){
        res.status(404).json({success: false, messsage: "Not found!"})
    }
}

const createReview = async (req, res) => {
    // console.log(req.user);
    if (!req.body.serviceProvider) req.body.serviceProvider = req.params.serviceProviderId;
    if (!req.body.user) req.body.client = req.user._id;

    const newReview = new Review(req.body);

    try {
        const savedReview = await newReview.save(); // Use await here
        // console.log(savedReview); // Log savedReview._doc instead of savedReview
        await ServiceProvider.findByIdAndUpdate(req.body.serviceProvider, {
            $push: { reviews: savedReview._id }
        });

        res.status(200).json({ success: true, message: "Review Submitted", data: savedReview});
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


router.get('/', getAllReviews);
router.post('/', passport.authenticate("jwt", {session: false}), restrict(["client"]), createReview);
module.exports=router;