import mongoose from "mongoose";
const jsonForms = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    jsonform: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
    { timestamps: true }
);


const jsonForm = mongoose.model('jsonForms', jsonForms);
export default jsonForm;