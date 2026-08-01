import { createSlice } from "@reduxjs/toolkit";

const goalSlice = createSlice({
  name: "goals",
  initialState: { items: [] },
  reducers: {
    setGoals: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setGoals } = goalSlice.actions;
export default goalSlice.reducer;
