import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "./teacherSlice"; // Adjust path if needed

const store = configureStore({
  reducer: {
    teacher: teacherReducer,
  },
});

// ✅ Export RootState and AppDispatch for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
