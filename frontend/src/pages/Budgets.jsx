import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useBudgets } from "../customHooks/useBudgets.js";
import { useCategories } from "../customHooks/useCategories.js";
import axiosInstance from "../utils/axiosInstance.js";
import BudgetCard from "../components/BudgetCard.jsx";
import Modal from "../components/Modal.jsx";

const Budgets = () => {
  const now = new Date();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: "", limitAmount: "" });
  const { loading, refetch } = useBudgets(now.getMonth() + 1, now.getFullYear());
  const { items } = useSelector((state) => state.budgets);
  const { categories } = useCategories("expense");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/budgets", {
        ...form,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      });
      toast.success("Budget saved");
      setShowModal(false);
      setForm({ category: "", limitAmount: "" });
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save budget");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Budgets — {now.toLocaleString("default", { month: "long" })}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Set Budget
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-400">No budgets set for this month yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((b) => (
            <BudgetCard key={b._id} budget={b} />
          ))}
        </div>
      )}

      {showModal && (
        <Modal title="Set Monthly Budget" onClose={() => setShowModal(false)}>
          <form onSubmit={handleAdd} className="space-y-3">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Monthly limit"
              value={form.limitAmount}
              onChange={(e) => setForm({ ...form, limitAmount: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg font-medium"
            >
              Save Budget
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Budgets;
