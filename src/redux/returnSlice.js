import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  returns: [],
};

const returnSlice = createSlice({
  name: "returns",
  initialState,
  reducers: {
    addReturnRequest: (state, action) => {
      state.returns.push(action.payload);
    },

    updateReturnStatus: (state, action) => {
      const { id, status } = action.payload;

      const req = state.returns.find((r) => r.id === id);
      if (req) {
        req.status = status;
      }
    },
  },
});

export const { addReturnRequest, updateReturnStatus } = returnSlice.actions;
export default returnSlice.reducer;
