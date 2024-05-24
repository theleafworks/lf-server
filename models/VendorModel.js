import mongoose from "mongoose";
import { v4 as uuid } from 'uuid';

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    vendorIdentifier: {
        type: String,
        required: true,
        default: uuid()
    },
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    usePersonalEmail:{
        type:Boolean,
        required:true,
        default:false
    }
});

export default mongoose.model('Vendor', vendorSchema);