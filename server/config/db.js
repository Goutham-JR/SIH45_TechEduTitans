const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/testdbs')
        console.log('MongoDB Connected');
    }catch(err)
    {
        console.errror(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;