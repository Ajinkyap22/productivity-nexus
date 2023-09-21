import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const initialState = {
  isExpanded: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export const selectIsExpanded = (state: RootState) => state.sidebar.isExpanded;

export default sidebarSlice.reducer;
