import VendorModel from "../models/VendorModel.js";

// checking the domain before the vendor can access the services
export const checkVendorAccess = async (req, res, next) => {
    
    const vendor = await VendorModel.findOne({ domain: req.origin });
    console.log("New request received for vendor : ",vendor?.hostname ?? req.origin);

    if (vendor){
        req.vendor = vendor;
        return next();
    }else{
        return res.send({
            success: false,
            statusCode: 400,
            message: "Vendor not registered"
        });
    }
}
