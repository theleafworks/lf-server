import express from "express";
import VendorController from "../controllers/VendorController.js";
const router = express.Router()

router.get('/', async(req, res, next) => await VendorController.GetVendors(req, res, next));
router.post('/create', async(req, res, next) => await VendorController.CreateVendor(req, res, next));

export default router;