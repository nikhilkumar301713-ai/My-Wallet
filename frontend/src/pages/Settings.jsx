import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import { setUser } from "../redux/userSlice.js";

const CURRENCIES = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

const Settings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser?.name || "");
  const [currency, setCurrency] = useState(currentUser?.currency || "USD");
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put("/user/profile", { name, currency });
      dispatch(setUser(data.user));
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/user/change-password", passwords);
      toast.success("Password changed");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-xl font-semibold">Settings</h1>

      <form
        onSubmit={handleProfileUpdate}
        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3"
      >
        <h2 className="font-semibold mb-2">Profile</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Save Profile
        </button>
      </form>

      {currentUser?.authProvider === "local" && (
        <form
          onSubmit={handlePasswordChange}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3"
        >
          <h2 className="font-semibold mb-2">Change Password</h2>
          <input
            type="password"
            placeholder="Current password"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
          />
          <input
            type="password"
            placeholder="New password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
          />
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
