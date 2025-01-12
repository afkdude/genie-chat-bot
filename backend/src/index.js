import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js'

import geminiRoutes from "./routes/geminiRoutes.js";
import { connectDb } from "./config/db.js";

const app = express();
const PORT = 5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }

)) // Replace with your frontend URL

// Use the geminiRoutes for API requests
app.use("/api/gemini", geminiRoutes);

app.use('/api/auth', authRoutes); 


app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  connectDb(); 

});
