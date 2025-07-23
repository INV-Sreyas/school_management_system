import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../api/apiConstants";

export const fetchTeachers = createAsyncThunk("teachers/fetchAll", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_ENDPOINTS.VIEW_TEACHERS, {
    // await api.post(API_ENDPOINTS.REGISTER_TEACHER, payload);
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

interface TeacherState {
  teachers: any[];
  loading: boolean;
  error: string;
}

const initialState: TeacherState = {
  teachers: [],
  loading: false,
  error: "",
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch teachers";
      });
  },
});

export default teacherSlice.reducer;
