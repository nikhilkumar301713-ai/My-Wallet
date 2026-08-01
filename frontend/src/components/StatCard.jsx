const StatCard = ({ label, value, icon: Icon, colorClass = "text-primary-600" }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colorClass}`}>{value}</p>
    </div>
    {Icon && (
      <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${colorClass}`}>
        <Icon size={22} />
      </div>
    )}
  </div>
);

export default StatCard;
