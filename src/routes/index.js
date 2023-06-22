import express from "express";
import start from "./start/index.js";
import admin from "./admin/index.js";
import login from "./login/index.js";
import token from "./token/index.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

router.use(start);
router.use("/login", login);
router.use("/token", token);
router.use("/admin", admin);

export default router;
