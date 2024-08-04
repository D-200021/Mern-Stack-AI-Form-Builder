import express from "express";
import { submitResponseData, getFormResponseById } from "../controllers/submitResponse.controller.js";

const router = express.Router();

router.post("/submitResponse", submitResponseData);

router.post("/getFormResponseData", getFormResponseById)

export default router;