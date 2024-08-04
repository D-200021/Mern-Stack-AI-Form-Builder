import mongoose from "mongoose";
import submitResponse from "../models/userresponse.model.js";

export const submitResponseData = async (req, res) => {
    try {
        const { formData, formId, id } = req.body;
        const userResponse = new submitResponse({
            id: id,
            formId: formId,
            formData: formData,
        });
        await userResponse.save();
        res.status(201).json({
            message: "Form Submitted Successfully",
        });
    } catch (error) {
        console.log(error);
    }
}

export const getFormResponseById = async (req, res) => {
    try {
        const { id } = req.body;
        const userResponse = await submitResponse.find({ formId: id });
        console.log(userResponse);
        if (userResponse) {
            res.status(200).json(userResponse);
        }
    } catch (error) {
        console.log(error);
        console.log("Error In getFormResponseById Function :", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
