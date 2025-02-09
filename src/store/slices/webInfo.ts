import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageTitle: "Dashboard",
};
const webInfoSlice = createSlice({
  name: "webInfo",
  initialState,
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
  },
});

export const { setPageTitle } = webInfoSlice.actions;
export default webInfoSlice.reducer;
