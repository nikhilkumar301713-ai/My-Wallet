

import { useSelector } from "react-redux";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { useSummary } from "../customHooks/useTransactions.js";
import StatCard from "../components/StatCard.jsx";
import ExpensePieChart from "../components/ExpensePieChart.jsx";
import TransactionRow from "../components/TransactionRow.jsx";
import { getCurrencySymbol } from "../utils/currencyFormat.js";

const Dashboard = () => {
  const now = new Date();
  const { loading } = useSummary(now.getMonth() + 1, now.getFullYear());
  const { summary } = useSelector((state) => state.transactions);
  const { currentUser } = useSelector((state) => state.user);

  const symbol = getCurrencySymbol(summary?.currency || currentUser?.currency || "USD");

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Balance"
          value={`${symbol}${(summary?.balance ?? 0).toFixed(2)}`}
          icon={Wallet}
        />
        <StatCard
          label="Income this month"
          value={`${symbol}${(summary?.income ?? 0).toFixed(2)}`}
          icon={TrendingUp}
          colorClass="text-green-500"
        />
        <StatCard
          label="Expenses this month"
          value={`${symbol}${(summary?.expense ?? 0).toFixed(2)}`}
          icon={TrendingDown}
          colorClass="text-red-500"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="font-semibold mb-2">Spending by category</h2>
          {!loading && <ExpensePieChart data={summary?.categoryBreakdown || []} />}
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="font-semibold mb-2">Quick stats</h2>
          <p className="text-sm text-gray-500 mb-4">
            {summary?.transactionCount ?? 0} transactions recorded this month.
          </p>
          <p className="text-sm text-gray-400">
            Head to the Transactions page to add or review entries, or check AI Insights for
            personalized tips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;