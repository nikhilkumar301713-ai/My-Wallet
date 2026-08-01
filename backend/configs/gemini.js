import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiModel = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing. Check your .env file and dotenv.config() placement.");
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
};