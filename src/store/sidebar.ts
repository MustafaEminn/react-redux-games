import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface SidebarState {
  visible: boolean;
}

const initialState: SidebarState = {
  visible: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarVisibleValue: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { setSidebarVisibleValue } = sidebarSlice.actions;

export const getSidebarVisibleValue = (state: RootState) =>
  state.sidebar.visible;

export default sidebarSlice.reducer;
