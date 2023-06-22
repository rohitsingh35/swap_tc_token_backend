import express from "express";
import { signUpAdmin, signInAdmin } from "../../controllers/login/index.js";

const router = express.Router();

router.post("/signup/admin", signUpAdmin);
router.post("/signIn/admin", signInAdmin);

export default router;
