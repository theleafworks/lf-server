import VendorModel from "../models/VendorModel.js";
import Enquirymodel from "../models/Enquiries.js"
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import EmailCredentials from "../models/EmailCredentials.js";
dotenv.config();

class EnquiryController {
    static async addNewEnquiry(req, res, next) {
        try {
            const { name, query, mobileNo, email } = req.body;
            if (!query, !mobileNo) {
                return res.json({
                    statusCode: 400,
                    message: "Mobile number and query is required !"
                });
            }
            console.log("request from : ", req.hostname)
            const vendor = req.vendor;
            const enquiryData = {
                name: name,
                query: query,
                mobileNo: mobileNo,
                email: email,
                vendorIdentifier: vendor?.vendorIdentifier
            }

            const enquiry = new Enquirymodel(enquiryData)
            await enquiry.save();
            await EnquiryController.SendEmailToVendor(vendor, enquiryData);
            return res.json({
                statusCode: 201,
                message: "Enquiry added successfully"
            });
        } catch (err) {
            throw err;
        }
    }

    static async SendEmailToVendor(vendor, enquiryData) {
        try {

            var transporter;
            var senderEmail;
            if(vendor && vendor.usePersonalEmail){

                var vendorCredentials = await EmailCredentials.findOne({vendorIdentifier:vendor.vendorIdentifier})
                transporter = nodemailer.createTransport({
                    host: vendorCredentials.host,
                    port: vendorCredentials.port,
                    secure: vendorCredentials.secure, // true for 465, false for other ports
                    auth: {
                        user: vendorCredentials.email,
                        pass: vendorCredentials.password
                    },
                    tls: {
                        // Do not fail on invalid certs
                        rejectUnauthorized: false
                    }
                });
                senderEmail = vendorCredentials.email;
            }else{
                transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });
                senderEmail = process.env.EMAIL_USER
            }
             

            var htmlTemplate = `
            <p>Dear ${vendor.name},</p>
            <p>You have received a new enquiry:</p>
            <ul>
                <li>Name: ${enquiryData.name}</li>
                <li>Mobile Number: ${enquiryData.mobileNo}</li>
                <li>Email: ${enquiryData.email}</li>
                <li>Query: ${enquiryData.query}</li>
            </ul>
            <p>Thank you!</p>
            `;

            var mailOptions = {
                from: senderEmail,
                to: vendor.email,
                subject: "New Enquiry received",
                text: "Enquiry Recieved",
                html: htmlTemplate
            };

            console.log(mailOptions)

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}


export default EnquiryController;