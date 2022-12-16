const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    title:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    },
});

const Notification = mongoose.model('notification', NotificationSchema);  
module.exports = Notification;