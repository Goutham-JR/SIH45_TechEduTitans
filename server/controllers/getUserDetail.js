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

exports.username = async (req, res) => {    
    try {
        const userId = req.params.id; // Get user ID from request params
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Find the user by ID and return only the `name` field
        const user = await account.findById(userId).select('name');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ name: user.name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};
