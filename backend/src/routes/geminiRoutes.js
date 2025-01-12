import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the route
router.post("/response", async (req, res) => {
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

export default router;
