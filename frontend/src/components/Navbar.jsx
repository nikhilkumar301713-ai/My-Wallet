import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import { clearUser } from "../redux/userSlice.js";
import { toggleTheme } from "../redux/themeSlice.js";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      dispatch(clearUser());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h1 className="text-lg font-semibold">Welcome back, {currentUser?.name?.split(" ")[0]}</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {currentUser?.profileImage ? (
          <img
            src={currentUser.profileImage}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
            {currentUser?.name?.[0]?.toUpperCase()}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
