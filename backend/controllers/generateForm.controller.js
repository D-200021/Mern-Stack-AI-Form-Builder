import { GoogleGenerativeAI } from "@google/generative-ai";
import jsonForm from "../models/jsonforms.model.js";

export const generateForm = async (req, res) => {
    try {

        const { formPrompt, email, id } = req.body;

        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
        };

        const chatSession = model.startChat({
            generationConfig,
            // safetySettings: Adjust safety settings
            // See https://ai.google.dev/gemini-api/docs/safety-settings
            history: [],
        });

        const result = await chatSession.sendMessage(formPrompt);

        if (result) {

            const aiFormData = new jsonForm({
                jsonform: result.response.text(),
                createdBy: email,
                id: id
            });

            await aiFormData.save();

            res.status(201).json({
                jsonFormData: result.response.text(),
            });
        }

    } catch (error) {
        console.log(error);
        console.log("Error In Ai Model :", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getRecord = async (req, res) => {
    try {
        const { id, email } = req.body;
        const aiFormData = await jsonForm.findOne({ id: id, createdBy: email });
        if (aiFormData) {
            const formData = aiFormData.jsonform;
            res.status(200).json(formData);
        } else {
            res.status(404).json({ error: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        console.log("Error In getRecord Function :", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
