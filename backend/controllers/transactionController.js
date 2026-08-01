
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import { getExchangeRates } from "../utils/currency.js";

export const createTransaction = async (req, res) => {
  try {
    const { type, amount, currency, category, note, date, paymentMethod } = req.body;
    if (!type || !amount || !category) {
      return res.status(400).json({ message: "type, amount and category are required." });
    }
    const transaction = await Transaction.create({
      user: req.userId,
      type,
      amount,
      currency,
      category,
      note,
      date,
      paymentMethod,
    });
    const populated = await transaction.populate("category");
    res.status(201).json({ transaction: populated });
  } catch (error) {
    res.status(500).json({ message: "Failed to create transaction.", error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const {
      search,
      type,
      category,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      page = 1,
      limit = 20,
      sort = "-date",
    } = req.query;

    const filter = { user: req.userId };
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (search) filter.note = { $regex: search, $options: "i" };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = Number(minAmount);
      if (maxAmount) filter.amount.$lte = Number(maxAmount);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .populate("category")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
      Transaction.countDocuments(filter),
    ]);

    res.status(200).json({
      transactions,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions.", error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    ).populate("category");
    if (!transaction) return res.status(404).json({ message: "Transaction not found." });
    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction.", error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!transaction) return res.status(404).json({ message: "Transaction not found." });
    res.status(200).json({ message: "Transaction deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction.", error: error.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    const now = new Date();
    const m = Number(month) || now.getMonth() + 1;
    const y = Number(year) || now.getFullYear();
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0, 23, 59, 59);

    const user = await User.findById(req.userId).select("currency");
    const targetCurrency = user?.currency || "USD";

    const transactions = await Transaction.find({
      user: req.userId,
      date: { $gte: start, $lte: end },
    }).populate("category");

    const rates = await getExchangeRates(targetCurrency);

    let income = 0;
    let expense = 0;
    const byCategory = {};

    transactions.forEach((t) => {
      const sourceCurrency = t.currency || "USD";
      const rate = rates[sourceCurrency] ?? 1;
      const convertedAmount = t.amount * rate;

      if (t.type === "income") income += convertedAmount;
      else expense += convertedAmount;

      const catName = t.category?.name || "Uncategorized";
      if (!byCategory[catName]) {
        byCategory[catName] = { name: catName, value: 0, color: t.category?.color || "#64748b" };
      }
      byCategory[catName].value += convertedAmount;
    });

    res.status(200).json({
      income,
      expense,
      balance: income - expense,
      categoryBreakdown: Object.values(byCategory),
      transactionCount: transactions.length,
      currency: targetCurrency,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch summary.", error: error.message });
  }
};