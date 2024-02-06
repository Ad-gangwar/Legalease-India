const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
    },
    userType: {
        type: String,
        enum: ['User', 'Lawyer'],
        required: true,
    },
    notificationText: {
        type: String,
        required: true,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
