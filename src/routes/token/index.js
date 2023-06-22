import express from "express";
import { getTokensList, searchToken,getAllLanguage,selectLanguage, randomSponseredToken } from "../../controllers/token/index.js";

const router = express.Router();

router.get("/getTokensList", getTokensList);
router.get("/searchToken", searchToken);
router.get("/getAllLanguage", getAllLanguage);
router.get("/selectLanguage", selectLanguage);
router.get("/random/sponserToken", randomSponseredToken)


export default router;
