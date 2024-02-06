const Lawyer = require('../models/LawyerSchema');
const Service = require('../models/ServiceSchema');
const express = require('express');
const {restrict} = require('../utils/helpers');
const passport = require('passport');

const createNotification = async (req, res) => {
    try {
        const { user, notificationText } = req.body;

        if (!user || !notificationText) {
            return res.status(400).json({ error: "User and notification Text are required." });
        }

        const notification = new Notification({ user, notificationText });
        await notification.save();

        return res.status(201).json({ success: true, notification });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
