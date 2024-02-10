const express = require('express');
// const {restrict} = require('../utils/helpers');
const passport = require('passport');
const Notification=require('../models/NotificationSchema');

const createNotification = async (req, res) => {
    try {
        const { user, notificationText, userType} = req.body;
        // console.log(user, notificationText, userType);
        if (!user || !notificationText) {
            return res.status(400).json({ error: "User and notification Text are required." });
        }

        const notification = new Notification({ user, notificationText, userType});
        await notification.save();

        return res.status(201).json({ success: true, notification });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllNotifications = async (req, res) => {
    const id = req.user._id;
    try {
        const notifications = await Notification.find({ user: id }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, message: "Successful", data: notifications });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found!" });
    }
};


const deleteSingleNotification = async (req, res) => {
    try {
        const { notificationId } = req.body;

        if (!notificationId) {
            return res.status(400).json({ error: "Notification ID is required." });
        }

        // Assuming you have a Notification model and you want to delete by ID
        await Notification.findByIdAndDelete(notificationId);

        return res.status(200).json({ success: true, message: "Notification deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteAllNotifications = async (req, res) => {
    try {
        // console.log(req);
        const user= req.user._id;

        if (!user) {
            return res.status(400).json({ error: "User is required." });
        }

        // Assuming you have a Notification model and you want to delete by user
        await Notification.deleteMany({ user });

        return res.status(200).json({ success: true, message: "All notifications deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const router = express.Router();

router.post('/create', passport.authenticate("jwt", {session: false}), createNotification);
router.post('/deleteOne', passport.authenticate("jwt", {session: false}), deleteSingleNotification);
router.post('/deleteAll', passport.authenticate("jwt", {session: false}), deleteAllNotifications);
router.get('/getAll', passport.authenticate("jwt", {session: false}), getAllNotifications);

module.exports=router;