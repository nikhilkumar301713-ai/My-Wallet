
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import { getExchangeRates } from "../utils/currency.js";

export const getTrend = async (req, res) => {
  try {
    const months = Number(req.query.months) || 6;
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);

    const user = await User.findById(req.userId).select("currency");
    const targetCurrency = user?.currency || "USD";
    const rates = await getExchangeRates(targetCurrency);

    const transactions = await Transaction.find({
      user: req.userId,
      date: { $gte: start },
    });

    const buckets = {};
    for (let i = 0; i < months; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      buckets[key] = {
        month: d.toLocaleString("default", { month: "short", year: "2-digit" }),
        income: 0,
        expense: 0,
      };
    }

    transactions.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (buckets[key]) {
        const sourceCurrency = t.currency || "USD";
        const rate = rates[sourceCurrency] ?? 1;
        buckets[key][t.type] += t.amount * rate;
      }
    });

    res.status(200).json({ trend: Object.values(buckets), currency: targetCurrency });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trend report.", error: error.message });
  }
};


export const convertCurrency = async (req, res) => {
  try {
    const { amount, from = "USD", to = "USD" } = req.query;
    if (from === to) {
      return res.status(200).json({ result: Number(amount), rate: 1 });
    }
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`
    );
    const data = await response.json();
    if (data.result !== "success") {
      return res.status(400).json({ message: "Currency conversion failed.", data });
    }
    res.status(200).json({ result: data.conversion_result, rate: data.conversion_rate });
  } catch (error) {
    res.status(500).json({ message: "Failed to convert currency.", error: error.message });
  }
};

export const getExportData = async (req, res) => {
  try {
    const now = new Date();
    const month = Number(req.query.month) || now.getMonth() + 1;
    const year = Number(req.query.year) || now.getFullYear();
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const transactions = await Transaction.find({
      user: req.userId,
      date: { $gte: start, $lte: end },
    })
      .populate("category")
      .sort({ date: -1 });

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch export data.", error: error.message });
  }
};