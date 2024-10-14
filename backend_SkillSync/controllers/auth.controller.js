import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid Email ID" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Respond with user data
     res.status(200).json({
       user_id: user._id, // Send user ID
       name: user.name, // Send user's name
       email: user.email, // Send user's email
       role: user.role, // Send user's role (Admin or Trainer)
     });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

