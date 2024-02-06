const ServiceProvider = require('../models/ServiceProviderSchema');
const Service = require('../models/ServiceSchema');
const express = require('express');
const reviewRouter=require('./review');
const {restrict} = require('../utils/helpers');
const passport = require('passport');

const updateServiceProvider = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedServiceProvider });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const deleteServiceProvider = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedServiceProvider = await ServiceProvider.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedServiceProvider });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getSingleServiceProvider = async (req, res) => {
    const id = req.params.id;
    try {
        const serviceProvider = await ServiceProvider.findById(id).populate('reviews').select('-password');
        res.status(200).json({ success: true, message: 'Successfully found', data: serviceProvider });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};


const getAllServiceProviders = async (req, res) => {
    try {
        const {query}=req.query;
        let serviceProviders;
        if(query){
            serviceProviders=await ServiceProvider.find({
                isApproved: "approved",
                $or: [
                    {name: {$regex: query, $options: "i"}},
                    {specialization: {$regex: query, $options: "i"}},
                ],
                
            }).select('-password');
        }  else {
            serviceProviders = await ServiceProvider.find({isApproved: "approved"}).select('-password');
        }
        res.status(200).json({ success: true, message: 'Successfully found', data: serviceProviders });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getMyServiceReqs = async(req, res)=>{
    try{
        //step 1: retrieve ServiceReqs from Service for the specific user
        const servicesReq=await Service.find({serviceProvider: req.user._id}).populate("client");

        res.status(200).json({success: true, message: "ServiceReqs getting", data: servicesReq});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get ' });
    }
}

const getServiceProviderProfile = async(req, res)=>{
    const serviceProviderId=req.user._id;

    try{
        const serviceProvider=await ServiceProvider.findById(serviceProviderId);

        if(!serviceProvider){
            return res.status(404).json({success: false, message: "serviceProvider not found"});
        }

        const services=await Service.find({serviceProvider: serviceProviderId});

        const {password, ...rest} = serviceProvider._doc;

        res.status(200).json({success: true, message: "Profile info is getting", data: {...rest, services}});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
};

const router = express.Router();

router.use('/:serviceProviderId/review', reviewRouter);
router.get('/:id', getSingleServiceProvider);
router.get('/',  getAllServiceProviders);
router.put('/:id',  passport.authenticate("jwt", {session: false}), restrict(["serviceProvider"]), updateServiceProvider); 
router.delete('/:id',  passport.authenticate("jwt", {session: false}),restrict(["serviceProvider"]),  deleteServiceProvider);
router.get('/profile/me',passport.authenticate("jwt", { session: false }), restrict(["serviceProvider"]),  getServiceProviderProfile);
router.get('/ServiceReqs/my-ServiceReqs',passport.authenticate("jwt", { session: false }), restrict(["serviceProvider"]),  getMyServiceReqs); 
module.exports= router;