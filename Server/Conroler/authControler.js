import Admin from '../Model/authModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register user
export const register = async (req, res) => {
    const { username, email, password, approved, role } = req.body; // Include approved and role in request body
    try {
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user with the requested approved and role values, defaulting if not provided
      const newUser = new Admin({
        email,
        username,
        password: hashedPassword,
        approved: approved !== undefined ? approved : false, // Ensure `approved` is correctly set (default to false if not provided)
        role: role || 'user', // Default to 'user' if no role is provided
      });
  
      // Save the new user to the database
      await newUser.save();
      res.status(201).json({ message: 'User registered, awaiting admin approval' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error during registration' });
    }
  };
  

// Login user
// Login user
// export const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await Admin.findOne({ email });
//       if (!user) return res.status(400).json({ message: 'User not found' });
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token, role: user.role });  // Send role along with token
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.approved) {
      return res.status(400).json({ message: 'Your account is awaiting admin approval' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role, approved: user.approved });  // Send approval status
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
// Approve User
export const approveUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Admin.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.approved = true; // Mark the user as approved
    await user.save();

    res.status(200).json({ message: 'User approved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject User
export const rejectUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Find the user by ID
    const user = await Admin.findById(userId);
    
    // If no user is found, return 404 error
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete the user
    await Admin.findOneAndDelete({ _id: userId });

    // Return success response
    res.status(200).json({ message: 'User rejected and removed' });
  } catch (error) {
    // Log and return error if any occurs
    console.error("Error rejecting user:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all unapproved users for admin
export const getUnapprovedUsers = async (req, res) => {
  try {
    const users = await Admin.find({ approved: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unapproved users' });
  }
};
