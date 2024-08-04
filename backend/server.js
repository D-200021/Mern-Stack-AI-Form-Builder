import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import getData from './routes/getdata.routes.js';
import submitResponse from './routes/submitresponse.routes.js';
import path from "path";
dotenv.config();
const app = express();
const Port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/ai", getData);
app.use("/api/ai/userResponse", submitResponse);


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(Port, () => {
    connectToMongoDB();
    console.log(`app listening on port ${Port}!`);
});
