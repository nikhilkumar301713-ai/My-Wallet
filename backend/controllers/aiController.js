import { getGeminiModel } from "../configs/gemini.js";
import Transaction from "../models/transactionModel.js";

export const getAiInsights = async (req, res) => {
  try {
    const days = Number(req.body.days) || 30;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const transactions = await Transaction.find({
      user: req.userId,
      date: { $gte: since },
    }).populate("category");

    if (transactions.length === 0) {
      return res.status(200).json({
        insights: "Not enough transaction data yet. Add some transactions to get personalized insights.",
      });
    }

    const summary = transactions.map((t) => ({
      type: t.type,
      amount: t.amount,
      category: t.category?.name,
      date: t.date.toISOString().split("T")[0],
    }));

    const prompt = `You are a friendly personal finance assistant. Analyze the following ${days}-day transaction history (JSON) and provide:
1. A short summary of spending patterns (2-3 sentences)
2. Top 3 spending categories and whether that seems reasonable
3. One or two practical, specific tips to save money based on this data
4. A short note on income vs expense trend

Keep the whole response under 200 words, use plain conversational language, and format with short headers.

Transaction data:
${JSON.stringify(summary)}`;

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ insights: text });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate AI insights.", error: error.message });
  }
};

export const askAi = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Question is required." });

    const since = new Date();
    since.setDate(since.getDate() - 90);
    const transactions = await Transaction.find({
      user: req.userId,
      date: { $gte: since },
    }).populate("category");

    const summary = transactions.map((t) => ({
      type: t.type,
      amount: t.amount,
      category: t.category?.name,
      date: t.date.toISOString().split("T")[0],
    }));

    const prompt = `You are a personal finance assistant embedded in the MyWallet app. Answer the user's question using ONLY the transaction data provided below (last 90 days). Be concise and specific with numbers where relevant. If the data doesn't contain enough information to answer, say so.

User question: "${question}"

Transaction data:
${JSON.stringify(summary)}`;

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ answer: text });
  } catch (error) {
    res.status(500).json({ message: "Failed to get AI answer.", error: error.message });
  }
};
