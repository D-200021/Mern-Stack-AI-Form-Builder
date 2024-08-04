import express from "express";
import { deleteForm, generateForm, getFormListByUser, getRecord, getRecordById, updateRecord } from "../controllers/generateForm.controller.js";

const router = express.Router();

router.post("/generateForm", generateForm);

router.post("/getRecord/", getRecord);

router.post("/getRecordById/", getRecordById);

router.put("/updateRecord", updateRecord);

router.post("/getFormList", getFormListByUser);

router.post("/deleteForm", deleteForm);
export default router;