const Lawyer = require('../models/LawyerSchema');
const Service = require('../models/ServiceSchema');
const express = require('express');
const reviewRouter=require('./review');
const {restrict} = require('../utils/helpers');
const passport = require('passport');

const updateLawyer = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedLawyer = await Lawyer.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedLawyer });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const deleteLawyer = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedLawyer = await Lawyer.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedLawyer });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getSingleLawyer = async (req, res) => {
    const id = req.params.id;
    try {
        const lawyer = await Lawyer.findById(id).populate('reviews').select('-password');
        res.status(200).json({ success: true, message: 'Successfully found', data: lawyer });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};


const getAllLawyers = async (req, res) => {
    try {
        const {query}=req.query;
        let lawyers;
        if(query){
            lawyers=await Lawyer.find({
                isApproved: "approved",
                $or: [
                    {name: {$regex: query, $options: "i"}},
                    {specialization: {$regex: query, $options: "i"}},
                ],
                
            }).select('-password');
        }  else {
            lawyers = await Lawyer.find({isApproved: "approved"}).select('-password');
        }
        res.status(200).json({ success: true, message: 'Successfully found', data: lawyers });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getMyServiceReqs = async(req, res)=>{
    try{
        //step 1: retrieve ServiceReqs from Service for the specific user
        const servicesReq=await Service.find({lawyer: req.user._id}).populate("user");

        res.status(200).json({success: true, message: "ServiceReqs getting", data: servicesReq});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
}

const getLawyerProfile = async(req, res)=>{
    const lawyerId=req.user._id;

    try{
        const lawyer=await Lawyer.findById(lawyerId);

        if(!lawyer){
            return res.status(404).json({success: false, message: "Lawyer not found"});
        }

        const services=await Service.find({lawyer: lawyerId});

        const {password, ...rest} = lawyer._doc;

        res.status(200).json({success: true, message: "Profile info is getting", data: {...rest, services}});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
};

const router = express.Router();

router.use('/:lawyerId/review', reviewRouter);
router.get('/:id', getSingleLawyer);
router.get('/',  getAllLawyers);
router.put('/:id',  passport.authenticate("jwt", {session: false}), restrict(["lawyer"]), updateLawyer); 
router.delete('/:id',  passport.authenticate("jwt", {session: false}),restrict(["lawyer"]),  deleteLawyer);
router.get('/profile/me',passport.authenticate("jwt", { session: false }), restrict(["lawyer"]),  getLawyerProfile);
router.get('/ServiceReqs/my-ServiceReqs',passport.authenticate("jwt", { session: false }), restrict(["lawyer"]),  getMyServiceReqs); 
module.exports= router;