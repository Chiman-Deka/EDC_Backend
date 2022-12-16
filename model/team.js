const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    name:{
        type: String,
        required:true
    },
    role:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    image: {
        type: String,
        require: true
      },
});

const Team = mongoose.model('team', TeamSchema);  
module.exports = Team;