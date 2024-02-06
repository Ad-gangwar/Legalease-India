const Client = require('../models/ClientSchema');
const ServiceProvider = require('../models/ServiceProviderSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

// Creating an exports object for modularization
exports = {};

// Async function to generate a JWT token for a given client
exports.getToken = async (email, user) => {
    // Sign the JWT with the user's identifier, role, and the secret key
    // console.log(client.id);
    const token = jwt.sign({ identifier: user.id, role: user.role }, SECRET);

    // Return the generated token
    return token;
};

exports.restrict = roles => async (req, res, next) => {
    // console.log(req.client._id);
    const userId = req.user._id;

    let userData;

    const client = await Client.findById(userId);
    const serviceProvider = await ServiceProvider.findById(userId);

    if (client) {
        userData = client;
    }
    if (serviceProvider) {
        userData = serviceProvider;
    }

    // console.log(userData);

    if (!roles.includes(userData.role)) {
        return res.status(401).json({ success: false, message: 'You are not authorized!' });
    }

    next();
}

// Exporting the 'getToken' function for use in other parts of the application
module.exports = exports;
