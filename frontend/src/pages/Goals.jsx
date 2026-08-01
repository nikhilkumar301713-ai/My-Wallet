import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useGoals } from "../customHooks/useGoals.js";
import axiosInstance from "../utils/axiosInstance.js";
import GoalCard from "../components/GoalCard.jsx";
import Modal from "../components/Modal.jsx";

const Goals = () => {
  const [showModal, setShowModal] = useState(false);
  const [contributeId, setContributeId] = useState(null);
  const [contributeAmount, setContributeAmount] = useState("");
  const [form, setForm] = useState({ title: "", targetAmount: "", targetDate: "" });
  const { loading, refetch } = useGoals();
  const { items } = useSelector((state) => state.goals);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/goals", form);
      toast.success("Goal created");
      setShowModal(false);
      setForm({ title: "", targetAmount: "", targetDate: "" });
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create goal");
    }
  };

  const handleContribute = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/goals/${contributeId}/contribute`, { amount: contributeAmount });
      toast.success("Contribution added");
      setContributeId(null);
      setContributeAmount("");
      refetch();
    } catch (error) {
      toast.error("Failed to add contribution");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Savings Goals</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> New Goal
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-400">No savings goals yet. Create your first one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((g) => (
            <GoalCard key={g._id} goal={g} onContribute={setContributeId} />
          ))}
        </div>
      )}

      {showModal && (
        <Modal title="Create Savings Goal" onClose={() => setShowModal(false)}>
          <form onSubmit={handleAdd} className="space-y-3">
            <input
              placeholder="Goal title (e.g. Emergency Fund)"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Target amount"
              value={form.targetAmount}
              onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            <input
              type="date"
              value={form.targetDate}
              onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg font-medium"
            >
              Create Goal
            </button>
          </form>
        </Modal>
      )}

      {contributeId && (
        <Modal title="Add Contribution" onClose={() => setContributeId(null)}>
          <form onSubmit={handleContribute} className="space-y-3">
            <input
              type="number"
              step="0.01"
              placeholder="Amount to add"
              value={contributeAmount}
              onChange={(e) => setContributeAmount(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg font-medium"
            >
              Add Contribution
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Goals;
