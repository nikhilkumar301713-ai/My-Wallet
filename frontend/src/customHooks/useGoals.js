import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance.js";
import { setGoals } from "../redux/goalSlice.js";

export const useGoals = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/goals");
      dispatch(setGoals(data.goals));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return { loading, refetch: fetchGoals };
};
