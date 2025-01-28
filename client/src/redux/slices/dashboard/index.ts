import { createSlice } from '@reduxjs/toolkit';

const dashBoardSlice = createSlice({
  initialState: [],
  name: 'dashBoard',
  reducers: {
    add: (state, action) => {
      return action.payload;
    }
  }
});

export const { add } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
