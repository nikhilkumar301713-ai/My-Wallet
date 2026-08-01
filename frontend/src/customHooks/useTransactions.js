import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance.js";
import { setTransactions, setSummary } from "../redux/transactionSlice.js";

// filters: { search, type, category, startDate, endDate, minAmount, maxAmount, page, limit, sort }
export const useTransactions = (filters = {}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const filtersKey = JSON.stringify(filters);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/transactions", { params: filters });
      dispatch(setTransactions(data));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey, dispatch]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { loading, refetch: fetchTransactions };
};

export const useSummary = (month, year) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/transactions/summary", {
          params: { month, year },
        });
        dispatch(setSummary(data));
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [month, year, dispatch]);

  return { loading };
};
