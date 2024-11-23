const mongoose = require('mongoose')

const connectDB = async() => {
    try{
<<<<<<< Updated upstream
        const conn = await mongoose.connect('mongodb://localhost:27017/testdbs')
=======
        const conn = await mongoose.connect('mongodb://localhost:27017/testdbs');
>>>>>>> Stashed changes
        console.log('MongoDB Connected');
    }catch(err)
    {
        console.errror(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;