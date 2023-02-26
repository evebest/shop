// state들을 보관하는 js 파일(redux)
import { configureStore, createSlice } from "@reduxjs/toolkit";
import cart from "./cartSlice";

// useState랑 비슷한 기능을 함. 이거 하나를 slice라고 부름.
const user = createSlice({
  name: "user",
  initialState: { id: 0, name: "Kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "Park";
    },
    changeAge(state, action) {
      state.age += action.payload;
    },
  },
});
export const { changeName, changeAge } = user.actions;

// 만든 slice를 등록하는 곳.
export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
