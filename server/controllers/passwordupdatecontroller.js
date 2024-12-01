const bcrypt = require('bcrypt');
const account = require('../models/user'); // User model

exports.passwordUpdate = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    console.log(req.user)
    // Find the user by ID (from the authenticated user)
    const user = await account.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current password matches the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', errorMessage: err.message });
  }
};
