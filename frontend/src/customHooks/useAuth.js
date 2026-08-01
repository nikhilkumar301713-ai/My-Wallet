import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance.js";
import { setUser, clearUser } from "../redux/userSlice.js";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/auth/me");
        dispatch(setUser(data.user));
      } catch (error) {
        dispatch(clearUser());
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default useAuth;
