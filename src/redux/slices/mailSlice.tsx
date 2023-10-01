import { AllMail } from "@/types/Mail";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type MailState = {
  activeMail: AllMail | null;
};

const initialState: MailState = {
  activeMail: null,
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setActiveMail: (state, action: PayloadAction<AllMail>) => {
      state.activeMail = action.payload;
    },
  },
});

export const selectActiveMail = (state: RootState) => state.mail.activeMail;

export const { setActiveMail } = mailSlice.actions;

export default mailSlice.reducer;
