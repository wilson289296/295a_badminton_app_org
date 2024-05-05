let mongoose = require("mongoose");
let validator = require('validator');

const invitationSchema = mongoose.Schema({

    invitorEmail:{ //Daniel send the invitation to Jennifer
        type: String,
        required: [true, "Invitor Email is a required field"]
    },
    inviteeEmail:{ //Jennifer's email
        //type: String,
        type: Array,
        required: [true, "Invitee Email is a required field"]
    },
    invitorPartnerEmail:{
        type: String
    },
    phoneNumber:{
        type: String
    },
    gamingDate:{
        type: Date, 
        required:[true, "Game date is a required field"]
    },
    gameStartTime:{
        type: String, 
        required:[true, "Game Start time is a required field"]
    },
    gameEndTime:{
        type: String, 
        
    },
    address:{
        type: String,
        required: [true, "Address is a required field"]
    },
    zipCode:{
        type: String,
        required: [true, "Zip code is a required field"]
    },
    note:{
        type: String
    }
},{
    timestamps:true
})

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;