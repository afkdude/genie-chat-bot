import express, { json } from "express";
// import fetch from "node-fetch";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'

const app = express();
const PORT = 5000;

dotenv.config(); 
app.use(json());
app.use(cors({ origin: "http://localhost:5174" })); // Replace with your frontend URL

// Initialize Google  AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/gemini", async (req, res) => {
  const { input } = req.body;

  try {
    const result = await model.generateContent(input); // Await the API response
    console.log("Full API Response:", JSON.stringify(result, null, 2)); // Log the full response for debugging

    // Access the text response
    const textResponse = result.response?.text();
    if (textResponse) {
      res.json({ completion: textResponse });
    } else {
      throw new Error("Text response is undefined");
    }
  } catch (error) {
    console.error("Error with Google Gemini API:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
