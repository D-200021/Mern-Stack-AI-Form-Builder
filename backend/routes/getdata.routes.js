import express from "express";
import { generateForm, getRecord } from "../controllers/generateForm.controller.js";

const router = express.Router();

router.post("/generateForm", generateForm);

router.post("/getRecord/", getRecord);


export default router;