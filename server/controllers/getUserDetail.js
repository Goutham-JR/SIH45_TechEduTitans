const account = require('../models/user')

exports.userdetail = async (req, res) => {    
    try{
        const user = await account.findById(req.user.id);
        if(!user)
        {
            return res.status(404).json({error: 'User not found'});
        }

        res.status(200).json({user});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error: 'Server error', error: err.message});
    }
};


