const BudgetCard = ({ budget }) => {
  const { category, limitAmount, spent, percentUsed } = budget;
  const isOver = percentUsed > 100;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm">{category?.name}</span>
        <span className="text-xs text-gray-400">
          ${spent.toFixed(2)} / ${limitAmount.toFixed(2)}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${isOver ? "bg-red-500" : "bg-primary-500"}`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>
      <p className={`text-xs mt-1 ${isOver ? "text-red-500" : "text-gray-400"}`}>
        {percentUsed}% used
      </p>
    </div>
  );
};

export default BudgetCard;
