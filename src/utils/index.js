import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/environment.js";

export const generateToken = (data) => jwt.sign(data, JWT_SECRET);
