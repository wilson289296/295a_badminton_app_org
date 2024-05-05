let mongoose = require("mongoose");

const matchHistorySchema = mongoose.Schema({
    email:{ //coming from the MatchHistory schema
        type: String,
        required: [true, "Email is a required field"]
    },
    date:{
        type: Date,
        required: [true, "Match Date is a required field"]
    },
    format:{
        type: String,
        required: [true, "Play format is a required field"]
    },
    matchingPartners:{
        type: String
    },
    matchingOpponents:{
        type: Array,
        required: [true, "Opponent is a required field"]
    },
    yourScore:{
        type: Number,
        required: [true, "Score is a required field"]
    },
    opponentScore:{
        type: Number,
        required: [true, "Score is a required field"]
    }
},{
    timestamps:true
})

const MatchHistory = mongoose.model("MatchHistory", matchHistorySchema);

module.exports = MatchHistory;