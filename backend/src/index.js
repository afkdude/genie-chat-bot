import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 5000;

// Middleware
app.use(json());
app.use(cors({ origin: "http://localhost:5174" })); // Replace with your frontend URL

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyDWhK9KJ0cC6Rixr11sFnU1Fc8btfJfI2E");
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
