import Budget from "../models/budgetModel.js";
import Transaction from "../models/transactionModel.js";

export const createBudget = async (req, res) => {
  try {
    const { category, limitAmount, month, year } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { user: req.userId, category, month, year },
      { limitAmount },
      { new: true, upsert: true }
    ).populate("category");
    res.status(201).json({ budget });
  } catch (error) {
    res.status(500).json({ message: "Failed to create budget.", error: error.message });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const now = new Date();
    const month = Number(req.query.month) || now.getMonth() + 1;
    const year = Number(req.query.year) || now.getFullYear();

    const budgets = await Budget.find({ user: req.userId, month, year }).populate("category");

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const results = await Promise.all(
      budgets.map(async (b) => {
        const spentAgg = await Transaction.aggregate([
          {
            $match: {
              user: b.user,
              category: b.category._id,
              type: "expense",
              date: { $gte: start, $lte: end },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const spent = spentAgg[0]?.total || 0;
        return {
          ...b._doc,
          spent,
          remaining: b.limitAmount - spent,
          percentUsed: Math.min(Math.round((spent / b.limitAmount) * 100), 999),
        };
      })
    );

    res.status(200).json({ budgets: results });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budgets.", error: error.message });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!budget) return res.status(404).json({ message: "Budget not found." });
    res.status(200).json({ message: "Budget deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget.", error: error.message });
  }
};
