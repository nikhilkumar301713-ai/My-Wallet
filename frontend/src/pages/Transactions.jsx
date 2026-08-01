import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Plus, Search } from "lucide-react";
import { useTransactions } from "../customHooks/useTransactions.js";
import { useCategories } from "../customHooks/useCategories.js";
import axiosInstance from "../utils/axiosInstance.js";
import TransactionRow from "../components/TransactionRow.jsx";
import Modal from "../components/Modal.jsx";

const Transactions = () => {
  const [filters, setFilters] = useState({ search: "", type: "", category: "" });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: "expense", amount: "", category: "", note: "", date: "" });

  const { loading, refetch } = useTransactions(filters);
  const { items } = useSelector((state) => state.transactions);
  const { categories } = useCategories(form.type);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      toast.success("Transaction deleted");
      refetch();
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/transactions", form);
      toast.success("Transaction added");
      setShowModal(false);
      setForm({ type: "expense", amount: "", category: "", note: "", date: "" });
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Transactions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            placeholder="Search notes..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
          />
        </div>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
        >
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No transactions found.</p>
        ) : (
          items.map((t) => <TransactionRow key={t._id} transaction={t} onDelete={handleDelete} />)
        )}
      </div>

      {showModal && (
        <Modal title="Add Transaction" onClose={() => setShowModal(false)}>
          <form onSubmit={handleAdd} className="space-y-3">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value, category: "" })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
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
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            <input
              placeholder="Note (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg font-medium"
            >
              Save Transaction
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Transactions;
