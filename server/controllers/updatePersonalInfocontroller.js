const User = require('../models/user'); 

/*exports.getUserInfo = async (req, res) => {
  const { sessionemail } = req.query;

  try {
    if (!sessionemail) {
      return res.status(400).json({ error: 'Session email is required' });
    }

    const user = await User.findOne({ email: sessionemail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      name: user.name,
      gender: user.gender,
      collegeName: user.collegeName,
      dob: user.dob,
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/


exports.updateUserInfo = async (req, res) => {
  try {
    const { sessionemail, gender, collegeName, dob } = req.body;
    console.log(sessionemail);

    if (!sessionemail || !gender || !collegeName || !dob) {
      return res.status(400).json({ error: 'All fields are required.' });
    }


    const user = await User.findOne({ email: sessionemail });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    console.log(sessionemail);

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--; 
    }

    if (age < 12) {
      return res.status(400).json({ error: 'Age must be above 12 years.' });
    }

    user.gender = gender;
    user.collegeName = collegeName;
    user.dob = dob;

    await user.save();

    res.status(200).json({ message: 'Personal information updated successfully.' });
  } catch (error) {
    console.error('Error updating personal information:', error);
    res.status(500).json({ error: 'An error occurred while updating personal information.' });
  }
};
