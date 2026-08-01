const GoalCard = ({ goal, onContribute }) => {
  const percent = Math.min(Math.round((goal.savedAmount / goal.targetAmount) * 100), 100);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold">{goal.title}</h3>
        {goal.status === "completed" && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            Completed
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-2">
        ${goal.savedAmount.toFixed(2)} of ${goal.targetAmount.toFixed(2)}
      </p>
      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mb-3">
        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${percent}%` }} />
      </div>
      {goal.status !== "completed" && (
        <button
          onClick={() => onContribute(goal._id)}
          className="text-sm text-primary-600 font-medium hover:underline"
        >
          + Add contribution
        </button>
      )}
    </div>
  );
};

export default GoalCard;
