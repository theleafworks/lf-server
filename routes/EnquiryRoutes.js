import express from "express";
import EnquiryController from "../controllers/enquiryController.js";
import { checkVendorAccess } from "../middleware/vendorMiddleWare.js";
const router = express.Router()
EnquiryController


router.post('/create', checkVendorAccess, EnquiryController.addNewEnquiry);


export default router;