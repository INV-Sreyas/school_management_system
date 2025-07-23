import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "./teacherSlice"; // Adjust path if needed
import studentReducer from "./studentSlice";

const store = configureStore({
  reducer: {
    teacher: teacherReducer,
    student: studentReducer
  },
});

// ✅ Export RootState and AppDispatch for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
