import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    plusCount(state, action) {
      state[action.payload].count += 1;
    },
    minusCount(state, action) {
      state[action.payload].count -= 1;
    },
    addFeeling(state, action) {
      const id = state.length;
      const name = action.payload.content;
      const count = 1;
      state.push({ id: id, name: name, count: count });
    },
    deleteFeeling(state, action) {
      state.splice(action.payload, 1); // 0번째꺼 1개만 지워라.
    },
  },
});
export const { plusCount, minusCount, addFeeling, deleteFeeling } =
  cart.actions;

export default cart;
