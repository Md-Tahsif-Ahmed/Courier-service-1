const User = require('../models/User');  // Adjust the path to your model
const Consignment = require('../models/Consignment');  
const bcrypt = require('bcryptjs');


getAllUsers = async (req, res) => {
    try {
        const {role} = req.query; 
        console.log("UserRole filter:", role);
        const query = {};
        if (role) query.role = role;
        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message,
        });
    }
};
// get by user ID
getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid user ID.' });
      }
      res.status(500).json({ message: 'Error fetching user data.' });
    }
  };
//   get user by Email
getUserByEmail = async (req, res) => {
    const userEmail = req.params.email;
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user data.' });
    }
  };
  
  
// update user role by admin..............
updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        if (!user) {
            return res.status(404).json({message: 'User not found.'});

        }
        res.status(200).json({
            message: 'User updated successfully.',user
        });
      

         
    } catch (error) {
        console.error('Error updating user:', error);
        // invalid objectError
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID.' });
          }
      
          // Handle validation errors
          if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: 'Validation Error.', errors: messages });
          }
      
          // Generic server error
          res.status(500).json({ message: 'Server Error. Unable to update user.' });
        }
      };
 
// update user profile by user


updateUserProfile = async (req, res) => {
    const userEmail = req.params.email;
    let updates = req.body;

    // If the password is being updated, hash it before saving
    if (updates.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        } catch (err) {
            return res.status(500).json({ message: 'Error hashing the password.' });
        }
    }

    try {
        const user = await User.findOneAndUpdate({ email: userEmail }, updates, {
            new: true,
            runValidators: true,
            context: 'query',
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            message: 'User updated successfully.',
            user,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ message: 'Validation Error.', errors: messages });
        }

        res.status(500).json({ message: 'Server Error. Unable to update user.' });
    }
};


 
// delete user by id
deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);  // Use 'User' instead of 'user'
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        // Handle Invalid ObjectId error
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        // Generic server error
        res.status(500).json({ message: 'Server Error. Unable to delete' });
    }
};

 

// Get user balance by email
const getUserBalance = async (req, res) => {
  try {
    const userEmail = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's balance
    res.json({ balance: user.balance });
  } catch (error) {
    console.error('Error fetching account balance:', error);
    res.status(500).json({ message: 'Error fetching account balance' });
  }
};


// User/marchant pay system
const payMarchant = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    // .......admin......
    const admin = await User.findOne({ role: 'Admin' });
    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    admin.balance -= amount;
    await admin.save();

    // Find the user and check if there's enough pending balance
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // if (user.pendingBalance < amount) {
    //   return res.status(400).json({ error: 'Insufficient pending balance' });
    // }

    // Update the user's balances
    user.pendingBalance -= amount;
    user.balance += amount;
    user.sumDeposite -= amount;
    await user.save();


    // Update all consignments associated with the user's email where status is "deposited"
    await Consignment.updateMany(
      { semail: user.email, status: 'deposited' },
      { status: 'paid' }
    );

    res.json({ message: 'Payment processed successfully', updatedUser: user });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

//Controller function ... Find user by role ==="Delivery Boy"
getUsersByRole = async (req, res) => {
  const { role } = req.query; // Check query parameter
  console.log("Role received:", role); // Debugging console log
  try {
    const users = await User.find({ role }); // Fetching users
    console.log("Users fetched:", users); // Debugging console log
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found with this role.' });
    }
    res.status(200).json(users); // Send fetched users
  } catch (error) {
    console.error("Error fetching users:", error); // Debugging error log
    res.status(500).json({ message: 'Error fetching users.' });
  }
};








 


module.exports = {
    getAllUsers,
    updateUser,
    getUserById,
    deleteUser,
    getUserByEmail,
    updateUserProfile,
    getUserBalance,
    payMarchant,
    getUsersByRole,
 
};
