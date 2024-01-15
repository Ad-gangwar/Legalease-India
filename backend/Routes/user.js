const User = require('../models/UserSchema');
const Service = require('../models/ServiceSchema');
const Lawyer = require('../models/LawyerSchema');
const express = require('express');
const {restrict} = require('../utils/helpers');
const passport = require('passport');

const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (!updatedUser) {
            // User not found
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Successfully updated
        return res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ success: false, message: 'Failed to update user' });
    }
};


const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select('-password');
        // console.log('User:', user);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Successfully found', data: user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Failed' });
    }
};


const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, message: 'Successfully found', data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getUserProfile = async(req, res)=>{
    // console.log(req);
    const userId=req.user._id;

    try{
        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        const {password, ...rest} = user._doc;

        res.status(200).json({success: true, message: "Profile info is getting", data: {...rest}});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
};


const getMyServiceReqs = async(req, res)=>{
    try{
        //step 1: retrieve ServiceReqs from Service for the specific user
        const servicesReq=await Service.find({user: req.user._id}).populate("lawyer");

        res.status(200).json({success: true, message: "ServiceReqs getting", data: servicesReq});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
}


const makeServiceReq = async (req, res) => {
    const { serviceName, lawyer, documents, fees, serviceDate } = req.body;
    const userId = req.user._id;

    try {
        const newService = new Service({ serviceName, lawyer, user: userId, documents, fees, serviceDate });
        await newService.save();

        // Use .populate('lawyer') when querying the database to replace the lawyer field with actual lawyer document
        const populatedService = await Service.findById(newService._id).populate('lawyer');

        res.status(201).json({ success: true, data: populatedService });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Service request failed!' });
    }
};


const router = express.Router();

router.get('/:id', passport.authenticate("jwt", { session: false}), restrict(["user"]), getSingleUser);
router.get('/', passport.authenticate("jwt", { session: false}), restrict(["admin"]), getAllUser);
router.put('/:id', passport.authenticate("jwt", { session: false }), restrict(["user"]), updateUser); // Use router.put for updating
router.delete('/:id',passport.authenticate("jwt", { session: false }), restrict(["user"]),  deleteUser); // Use router.delete for deleting
router.get('/profile/me',passport.authenticate("jwt", { session: false }), restrict(["user"]),  getUserProfile); 
router.get('/ServiceReqs/my-ServiceReqs',passport.authenticate("jwt", { session: false }), restrict(["user"]),  getMyServiceReqs); 
router.post('/makeServiceReq', passport.authenticate("jwt", { session: false }), restrict(["user"]), makeServiceReq); 

module.exports= router;