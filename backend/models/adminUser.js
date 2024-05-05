let mongoose = require("mongoose");

const adminUserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},{
    timestamps:true
})

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

module.exports = AdminUser;