// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
  },
  reducers: {
    setLoggedStatus: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setLoggedStatus } = userSlice.actions;
export default userSlice.reducer;
