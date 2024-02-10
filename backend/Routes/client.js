const Client = require('../models/ClientSchema');
const Service = require('../models/ServiceSchema');
const express = require('express');
const { restrict } = require('../utils/helpers');
const passport = require('passport');
const Stripe = require('stripe');
require('dotenv').config();

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

const getClientProfile = async (req, res) => {
    // console.log(req);
    const clientId = req.user._id;

    try {
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        const { password, ...rest } = client._doc;

        res.status(200).json({ success: true, message: "Profile info is getting", data: { ...rest } });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
};


const getMyServiceReqs = async (req, res) => {
    try {
        //step 1: retrieve ServiceReqs from Service for the specific client
        const servicesReq = await Service.find({ client: req.user._id }).populate("serviceProvider");

        res.status(200).json({ success: true, message: "ServiceReqs getting", data: servicesReq });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
}


const makeServiceReq = async (req, res) => {
    const { serviceName, serviceProvider, documents, fees, serviceDate } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const clientId = req.user._id;

    try {
        // Create Stripe checkout session with customer email, name, and address
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            customer_email: req.user.email,
            client_reference_id: serviceProvider._id,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        unit_amount: fees * 100,
                        product_data: {
                            name: serviceProvider.name,
                            description: serviceProvider.bio,
                            images: [serviceProvider.photo]
                        },
                    },
                    quantity: 1
                }
            ],
        });

        const newService = new Service({ serviceName, serviceProvider: serviceProvider._id, client: clientId, documents, fees, serviceDate, session: session.id });
        await newService.save();

        const populatedService = await Service.findById(newService._id).populate('serviceProvider');

        res.status(201).json({ success: true, data: populatedService, session });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Service request failed!' });
    }
};

const updateServiceStatus = async (req, res) => {
    const serviceReqId = req.body.id;
    try {
        const updatedService = await Service.findByIdAndUpdate(serviceReqId, { $set: { isPaid: true }}, { new: true });
        // The { new: true } option ensures that the updated document is returned
        if (!updatedService) {
            return res.status(404).json({ success: false, message: 'Service request not found!' });
        }
        res.status(200).json({ success: true, data: updatedService });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Service request failed!' });
    }
}


const router = express.Router();

router.get('/:id', passport.authenticate("jwt", { session: false }), restrict(["client"]), getSingleClient);
router.get('/', passport.authenticate("jwt", { session: false }), restrict(["admin"]), getAllClient);
router.put('/:id', passport.authenticate("jwt", { session: false }), restrict(["client"]), updateClient); // Use router.put for updating
router.delete('/:id', passport.authenticate("jwt", { session: false }), restrict(["client"]), deleteClient); // Use router.delete for deleting
router.get('/profile/me', passport.authenticate("jwt", { session: false }), restrict(["client"]), getClientProfile);
router.get('/ServiceReqs/my-ServiceReqs', passport.authenticate("jwt", { session: false }), restrict(["client"]), getMyServiceReqs);
router.post('/makeServiceReq', passport.authenticate("jwt", { session: false }), restrict(["client"]), makeServiceReq);
router.post('/updateStatus', passport.authenticate("jwt", { session: false }), updateServiceStatus);

module.exports = router;