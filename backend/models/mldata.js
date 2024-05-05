let mongoose = require("mongoose");

const aiModelSchema = mongoose.Schema({
    email:{ //coming from the MatchHistory schema
        type: String,
        required: [true, "Email is a required field"]
    },
    choices:{
        type: Array,
        required: [true, "Choices is a required field"]
    },
    weights:{
        type: Map,
        // keys are always strings. You specify the type of values using `of`.
        of: Number
    }
},{
    timestamps:true
})

//const AImodel = mongoose.model("AImodel", aiModelSchema);
// Compile the schema into a model
const AImodel = mongoose.model('AImodel', aiModelSchema, 'mldata');

module.exports = AImodel;