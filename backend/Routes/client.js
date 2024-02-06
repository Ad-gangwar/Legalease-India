const Client = require('../models/ClientSchema');
const Service = require('../models/ServiceSchema');
const ServiceProvider = require('../models/ServiceProviderSchema');
const express = require('express');
const {restrict} = require('../utils/helpers');
const passport = require('passport');

const updateClient = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
        const updatedClient = await Client.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (!updatedClient) {
            // client not found
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        // Successfully updated
        return res.status(200).json({ success: true, message: 'Successfully updated', data: updatedClient });
    } catch (err) {
        console.error('Error updating client:', err);
        return res.status(500).json({ success: false, message: 'Failed to update client' });
    }
};


const deleteClient = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedClient = await Client.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedClient });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getSingleClient = async (req, res) => {
    const id = req.params.id;
    try {
        const client = await Client.findById(id).select('-password');
        // console.log('Client:', client);

        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        res.status(200).json({ success: true, message: 'Successfully found', data: client });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Failed' });
    }
};


const getAllClient = async (req, res) => {
    try {
        const clients = await Client.find({}).select('-password');
        res.status(200).json({ success: true, message: 'Successfully found', data: clients });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getClientProfile = async(req, res)=>{
    // console.log(req);
    const clientId=req.user._id;

    try{
        const client=await Client.findById(clientId);

        if(!client){
            return res.status(404).json({success: false, message: "Client not found"});
        }

        const {password, ...rest} = client._doc;

        res.status(200).json({success: true, message: "Profile info is getting", data: {...rest}});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
};


const getMyServiceReqs = async(req, res)=>{
    try{
        //step 1: retrieve ServiceReqs from Service for the specific client
        const servicesReq=await Service.find({client: req.user._id}).populate("serviceProvider");

        res.status(200).json({success: true, message: "ServiceReqs getting", data: servicesReq});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
}


const makeServiceReq = async (req, res) => {
    const { serviceName, serviceProvider, documents, fees, serviceDate } = req.body;
    const clientId = req.user._id;

    try {
        const newService = new Service({ serviceName, serviceProvider, client: clientId, documents, fees, serviceDate });
        await newService.save();

        // Use .populate('serviceProvider') when querying the database to replace the serviceProvider field with actual serviceProvider document
        const populatedService = await Service.findById(newService._id).populate('serviceProvider');

        res.status(201).json({ success: true, data: populatedService });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Service request failed!' });
    }
};


const router = express.Router();

router.get('/:id', passport.authenticate("jwt", { session: false}), restrict(["client"]), getSingleClient);
router.get('/', passport.authenticate("jwt", { session: false}), restrict(["admin"]), getAllClient);
router.put('/:id', passport.authenticate("jwt", { session: false }), restrict(["client"]), updateClient); // Use router.put for updating
router.delete('/:id',passport.authenticate("jwt", { session: false }), restrict(["client"]),  deleteClient); // Use router.delete for deleting
router.get('/profile/me',passport.authenticate("jwt", { session: false }), restrict(["client"]),  getClientProfile); 
router.get('/ServiceReqs/my-ServiceReqs',passport.authenticate("jwt", { session: false }), restrict(["client"]),  getMyServiceReqs); 
router.post('/makeServiceReq', passport.authenticate("jwt", { session: false }), restrict(["client"]), makeServiceReq); 

module.exports= router;