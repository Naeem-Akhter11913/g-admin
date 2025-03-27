import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  theme: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload;
    },
    toggleSidebarUnfoldable: (state) => {
      state.sidebarUnfoldable = !state.sidebarUnfoldable;
    },
  },
});

// Export actions
export const { setSidebarShow, toggleSidebarUnfoldable } = uiSlice.actions;
export default uiSlice.reducer;
