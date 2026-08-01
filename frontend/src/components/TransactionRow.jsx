import { Trash2 } from "lucide-react";

const TransactionRow = ({ transaction, onDelete, currencySymbol = "$" }) => {
  const { type, amount, category, note, date } = transaction;
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-center gap-3">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
          style={{ backgroundColor: category?.color || "#64748b" }}
        >
          {category?.name?.[0]?.toUpperCase() || "?"}
        </span>
        <div>
          <p className="font-medium text-sm">{category?.name || "Uncategorized"}</p>
          <p className="text-xs text-gray-400">
            {note || "No note"} · {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-semibold ${type === "income" ? "text-green-500" : "text-red-500"}`}>
          {type === "income" ? "+" : "-"}
          {currencySymbol}
          {amount.toFixed(2)}
        </span>
        <button
          onClick={() => onDelete(transaction._id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TransactionRow;
