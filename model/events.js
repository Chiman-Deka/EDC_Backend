const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required: true,
        unique: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    image:{
        type: String,
        required: true
    }
});

const Event = mongoose.model('event', EventSchema);  
module.exports = Event;