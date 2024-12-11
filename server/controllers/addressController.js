const Address = require('../models/user');

// Add or update address
exports.saveAddress = async (req, res) => {
  try {
    const { sessionemail, line1, state, city, pincode } = req.body;
    console.log(sessionemail);

    // Validate the required fields
    if (!sessionemail || !line1 || !state || !city || !pincode) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await Address.findOne({ email: sessionemail });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    console.log(sessionemail);

    user.line1 = line1;
    user.state = state;
    user.city = city;
    user.pincode = pincode;
    user.country = 'India'; // Default country is India

    await user.save();

    res.status(200).json({ message: 'Address updated successfully.' });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'An error occurred while updating address.' });
  }
};

// Get user's address
exports.getAddress = async (req, res) => {
  try {
    const { sessionemail } = req; // Assuming sessionemail is set in the request object

    // Validate session email
    if (!sessionemail) {
      return res.status(401).json({ message: 'Unauthorized: No session email provided.' });
    }

    const address = await Address.findOne({ email: sessionemail }); // Search by sessionemail
    if (!address) {
      return res.status(404).json({ message: 'Address not found.' });
    }
    res.status(200).json({ address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving address.' });
  }
};
