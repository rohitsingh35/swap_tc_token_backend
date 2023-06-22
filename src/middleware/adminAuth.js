import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/environment.js";

const adminAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token, "token");

  if (typeof token === "undefined")
    return res.status(401).json({ error: "Auth Token Required" });

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error });
    req.user = user;
    next();
  });
};

export default adminAuth;
