import Goal from "../models/goalModel.js";

export const createGoal = async (req, res) => {
  try {
    const { title, targetAmount, targetDate, icon } = req.body;
    const goal = await Goal.create({
      user: req.userId,
      title,
      targetAmount,
      targetDate,
      icon,
    });
    res.status(201).json({ goal });
  } catch (error) {
    res.status(500).json({ message: "Failed to create goal.", error: error.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ goals });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch goals.", error: error.message });
  }
};

export const contributeToGoal = async (req, res) => {
  try {
    const { amount } = req.body;
    const goal = await Goal.findOne({ _id: req.params.id, user: req.userId });
    if (!goal) return res.status(404).json({ message: "Goal not found." });

    goal.savedAmount += Number(amount);
    if (goal.savedAmount >= goal.targetAmount) {
      goal.savedAmount = goal.targetAmount;
      goal.status = "completed";
    }
    await goal.save();
    res.status(200).json({ goal });
  } catch (error) {
    res.status(500).json({ message: "Failed to update goal.", error: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: "Goal not found." });
    res.status(200).json({ goal });
  } catch (error) {
    res.status(500).json({ message: "Failed to update goal.", error: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!goal) return res.status(404).json({ message: "Goal not found." });
    res.status(200).json({ message: "Goal deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete goal.", error: error.message });
  }
};
