import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: localStorage.getItem("mywallet-theme") === "dark" ? true : false,
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("mywallet-theme", action.payload ? "dark" : "light");
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("mywallet-theme", state.darkMode ? "dark" : "light");
    },
  },
});

export const { setDarkMode, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
