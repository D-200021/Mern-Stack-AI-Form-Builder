import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDb.js';
import authRoutes from './routes/auth.routes.js';
import getData from './routes/getdata.routes.js';

dotenv.config();
const app = express();
const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/ai", getData);

app.get("/", (req, res) => {
    res.send("API is running...");
});
app.listen(Port, () => {
    connectToMongoDB();
    console.log(`app listening on port ${Port}!`);
});