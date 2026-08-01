import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";

export const useCategories = (type) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/user/categories", { params: { type } });
        setCategories(data.categories);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [type]);

  return { categories, loading };
};
