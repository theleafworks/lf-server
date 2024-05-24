import VendorModel from "../models/VendorModel.js";

// checking the domain before the vendor can access the services
export const checkVendorAccess = async (req, res, next) => {
    console.log("request received for : ",req.headers.origin)
    const vendor = await VendorModel.findOne({ domain: req.headers.origin });
    console.log("New request received for vendor : ",vendor?.hostname ?? req.headers.origin);

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
