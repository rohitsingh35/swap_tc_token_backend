import ROLES from "../../constants/roles.js";
import { User } from "../../models/index.js";
import { generateToken } from "../../utils/index.js";

export const signUpAdmin = async (req, res) => {
  try {
    const user = new User({ ...req.body, role: ROLES.ADMIN });
    await user.save();
    return res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const signInAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: "User not found" });
    if (!(await user.validatePassword(password)))
      return res.status(200).json({ message: "Invalid creditionals" });
    return res.status(200).json({ token: generateToken(email) });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};
