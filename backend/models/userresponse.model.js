import mongoose from "mongoose";

const userResponse = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    formId: {
        type: String,
        required: true,
    },
    formData: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        default: "anonymous",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
    { timestamps: true }
);

const userResponseModel = mongoose.model('userResponse', userResponse);
export default userResponseModel;