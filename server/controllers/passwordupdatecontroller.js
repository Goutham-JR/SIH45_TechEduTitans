const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path to your User model as needed

// Controller to update the user's password
exports.updatePassword = async (req, res) => {
  try {
    const { sessionemail, currentPassword, newPassword } = req.body;
    if (!sessionemail || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ email: sessionemail });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Verify the current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'current password is wrong' });

    }

    // Check if the new password is the same as the current password
    const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSame) {
      return res.status(400).json({ error: 'New password cannot be the same as the current password.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'An error occurred while updating the password.' });
  }
};
