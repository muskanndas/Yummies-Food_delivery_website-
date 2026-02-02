import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    myshopdata: null
    
  },
  reducers: {
    setMyShopData: (state, action) => {
      state.myshopdata = action.payload?.myshopdata || action.payload;
    }

  }
}
);

export const {setMyShopData } = adminSlice.actions;
export default adminSlice.reducer;