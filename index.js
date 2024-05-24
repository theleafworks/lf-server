import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import vendorRoutes from "./routes/VendorRoutes.js";
import enquiryRoutes from "./routes/EnquiryRoutes.js";
import mongoose from 'mongoose';
import cors from 'cors'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());

app.use("/api/vendor", vendorRoutes);
app.use("/api/enquiry", enquiryRoutes);

const connectDb = async() => {
    try {
        mongoose.connect("mongodb+srv://theleafworks1:I25ozylCU7AAUYHg@leafworkscl1.j977vqa.mongodb.net").then(res => {
            console.log("Connected to database")
        }).catch((err) => {
            console.log("Error occured while connecting to database")
            throw err;
        });

    } catch (err) {
        console.log(err);
    }
}

app.listen(process.env.PORT, async() => {
    console.log("Server listening on PORT : ", process.env.PORT);
    await connectDb();
});