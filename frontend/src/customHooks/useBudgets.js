import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance.js";
import { setBudgets } from "../redux/budgetSlice.js";

export const useBudgets = (month, year) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/budgets", { params: { month, year } });
      dispatch(setBudgets(data.budgets));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [month, year]);

  return { loading, refetch: fetchBudgets };
};
