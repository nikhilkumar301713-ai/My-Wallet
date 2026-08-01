import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import TrendLineChart from "../components/TrendLineChart.jsx";

const Reports = () => {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState(6);

  useEffect(() => {
    const fetchTrend = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/reports/trend", { params: { months } });
        setTrend(data.trend);
      } finally {
        setLoading(false);
      }
    };
    fetchTrend();
  }, [months]);

  const handleExportCsv = async () => {
    const now = new Date();
    const { data } = await axiosInstance.get("/reports/export", {
      params: { month: now.getMonth() + 1, year: now.getFullYear() },
    });
    const rows = data.transactions.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.type,
      t.category?.name || "",
      t.amount,
      t.note || "",
    ]);
    const csv = ["Date,Type,Category,Amount,Note", ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mywallet-transactions.csv";
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-semibold">Financial Reports</h1>
        <div className="flex items-center gap-2">
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
          >
            <option value={3}>Last 3 months</option>
            <option value={6}>Last 6 months</option>
            <option value={12}>Last 12 months</option>
          </select>
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h2 className="font-semibold mb-2">Income vs Expense Trend</h2>
        {!loading && <TrendLineChart data={trend} />}
      </div>
    </div>
  );
};

export default Reports;
