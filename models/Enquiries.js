import mongoose from "mongoose";
import { v4 as uuid } from 'uuid';

const EnquirySchema = new mongoose.Schema({
    vendorIdentifier: {
        type: String,
        required: true,
        default: uuid()
    },
    name: {
        type: String,
        required: false
    },
    query: {
        type: String,
        required: false
    },
    mobileNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false
    }
});

export default mongoose.model('Enquiry', EnquirySchema);