import { useState } from "react";
import toast from "react-hot-toast";
import { Sparkles, Send } from "lucide-react";
import axiosInstance from "../utils/axiosInstance.js";

const AIInsights = () => {
  const [insights, setInsights] = useState("");
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const generateInsights = async () => {
    setLoadingInsights(true);
    try {
      const { data } = await axiosInstance.post("/ai/insights", { days: 30 });
      setInsights(data.insights);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate insights");
    } finally {
      setLoadingInsights(false);
    }
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoadingAnswer(true);
    try {
      const { data } = await axiosInstance.post("/ai/ask", { question });
      setAnswer(data.answer);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get an answer");
    } finally {
      setLoadingAnswer(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <Sparkles className="text-primary-600" size={20} /> AI Financial Insights
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">30-day spending analysis</h2>
          <button
            onClick={generateInsights}
            disabled={loadingInsights}
            className="text-sm bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {loadingInsights ? "Analyzing..." : "Generate Insights"}
          </button>
        </div>
        {insights ? (
          <p className="text-sm whitespace-pre-line text-gray-700 dark:text-gray-300">{insights}</p>
        ) : (
          <p className="text-sm text-gray-400">
            Click "Generate Insights" to get an AI-powered breakdown of your recent spending.
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h2 className="font-semibold mb-3">Ask about your finances</h2>
        <form onSubmit={handleAsk} className="flex gap-2 mb-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. How much did I spend on food last month?"
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
          />
          <button
            type="submit"
            disabled={loadingAnswer}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg disabled:opacity-60"
          >
            <Send size={16} />
          </button>
        </form>
        {answer && (
          <p className="text-sm whitespace-pre-line text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-3">
            {answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
