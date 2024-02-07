// Importing necessary modules and configurations
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
// Getting the secret key from environment variables
const SECRET = process.env.SECRET;
const URL = process.env.URL;
// Importing the User model and authentication routes
const Client = require('./models/ClientSchema');
const ServiceProvider = require('./models/ServiceProviderSchema');

const authRoutes = require('./Routes/auth');
const clientRoutes = require('./Routes/client');
const serviceProviderRoutes = require('./Routes/serviceProvider');
const reviewRoutes = require('./Routes/review');
const notificationRoutes = require('./Routes/notification');

// Creating an Express application
const app = express();

// Setting up the port for the server
const PORT = 5000 || process.env.PORT;

app.use(cors());
// Middleware to parse incoming JSON data
app.use(express.json());

// Simple route to test if the server is running
app.get("/", (req, res) => {
    res.send('Hello world');
});

// Setting up routes for authentication
app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/serviceProvider', serviceProviderRoutes);
app.use('/review', reviewRoutes);
app.use('/notification', notificationRoutes);

// Connecting to the MongoDB database
mongoose.connect(URL).then((x) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log(err);
    console.log('Error connecting to the database');
    process.exit(1);
});

// Setting up Passport middleware for JWT authentication
// This code checks the user against the authToken
//The name of this strategy is by default jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    // console.log('JWT Payload:', jwt_payload);

    try {
        let user;
        if (jwt_payload.role === 'client') {
            // console.log(jwt_payload.identifier)
            user = await Client.findById(jwt_payload.identifier);
        } else if (jwt_payload.role === 'serviceProvider') {
            user = await ServiceProvider.findById(jwt_payload.identifier);
        }

        if (user) {
            // console.log('User found:', user);
            return done(null, user);
        } else {
            // console.log('User not found');
            return done(null, false);
        }
    } catch (err) {
        console.error('Error during authentication:', err);
        return done(err, false);
    }
}));


// Starting the Express server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
