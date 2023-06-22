import express from "express";
import {
  postAddress,
  getAddress,
  getSponserToken,
  addSponserToken,
  getMessageWithDate,
  createMessage,
  getTokensList,
  getAllMessage,uploadLanguage
} from "../../controllers/admin/index.js";
const router = express.Router();

router.post("/add/address", postAddress);
router.get("/get/address", getAddress);
router.post("/add/addSponserToken", addSponserToken);
router.get("/get/getMessageWithDate", getMessageWithDate);
router.post("/add/message", createMessage);
router.get("/get/getSponserToken", getSponserToken);
router.get("/get/tokenlistbyaddress", getTokensList);

router.get("/get/getAllMessage", getAllMessage);
router.post("/add/uploadFile", uploadLanguage);

export default router;
