import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userdata: null,
    city: null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userdata = action.payload?.user || action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    }

  }
}
);

export const { setUserData, setCity } = userSlice.actions;
export default userSlice.reducer;