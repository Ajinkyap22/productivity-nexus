import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "@/redux/slices/sidebarSlice";
import userReducer from "@/redux/slices/userSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
