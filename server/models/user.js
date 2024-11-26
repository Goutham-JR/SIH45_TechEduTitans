const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{type: String, required: true},
        email:{type: String, required: true, unique:true},
        password:{type: String, required: true},
        phoneNumber:{type: String, required: false},
        role:{type: String, required: false},
    },{
        timestamps:true,
    }
);

module.exports =mongoose.model('Account', userSchema);