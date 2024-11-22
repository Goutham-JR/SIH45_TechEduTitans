const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({error:"User already exists!"});
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedpassword});
        await newUser.save();

        res.status(201).json({message:'User registerd successfully!'});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
};

exports.signIn = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error:"User does not exist!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(404).json({error:"Invalid Password!"});

        const token = jwt.sign({id:user._id}, '71b7a5bd9f02288473c40994f86cfcf051ac03a72af458aa39fd0bad674f0a951644e0ac80ccb620ce87b11914756b895bb0275a876044b523d2aea10dd427a5', {expiresIn: '1d'});

        res.status(200).json({message:"Login Successful!", token});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
};