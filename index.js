import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import uploadRoute from "./routes/upload.js";
import getallRoute from "./routes/getall.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;
const connect = async () => {
  try {
    console.log("url is ");
    console.log(process.env.MONGO);
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(bodyParser.json({ limit: "20mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  console.log("request is coming and the request is  Cookies:", req.cookies);
  next();
});
app.get("/", (req, res) => {
  res.send("Welcome to the Backend Home Route!");
});

app.use("/api/auth", authRoute);

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
