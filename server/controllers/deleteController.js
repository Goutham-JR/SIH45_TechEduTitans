const Account = require('../models/user');

exports.deleteAccount = async (req, res) => {
  try {
    const { sessionemail } = req.body; // Make sure to pass sessionemail in the body of the DELETE request
    if (!sessionemail) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const deletedAccount = await Account.findOneAndDelete({ email: sessionemail }); // Ensure you're matching 'email' field

    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the account.' });
  }
};
