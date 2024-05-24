import mongoose from "mongoose";
import VendorModel from "../models/VendorModel.js";

class VendorController {
    static async CreateVendor(req, res, next) {
        try {
            const { name, mobileNo, email, domain } = req.body;
            if (!name || !mobileNo || !domain) {
                res.send({
                    statusCode: 400,
                    message: "All requied fields must be passed to register a vendor"
                });
            }
            
            const vendor = VendorModel({
                domain: domain,
                name: name,
                mobileNumber: mobileNo,
                email: email
            });

            await vendor.save();
            return res.send({
                statusCode: 201,
                message: "vendor created"
            });
        } catch (err) {
            throw err;
        }
    }

    static async UpdateVendor(req, res) {

    }

    static async GetVendors(req, res, next) {
        try {
            const allVendors = await VendorModel.find();
            return res.json(allVendors)
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default VendorController;