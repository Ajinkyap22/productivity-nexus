import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { MailSidebarItems } from "@/types/mailSidebarItems";

const initialState = {
  isExpanded: true,
  activeItem: MailSidebarItems.INBOX,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

export const { toggleSidebar, setActiveItem } = sidebarSlice.actions;

export const selectIsExpanded = (state: RootState) => state.sidebar.isExpanded;
export const selectActiveItem = (state: RootState) => state.sidebar.activeItem;

export default sidebarSlice.reducer;
