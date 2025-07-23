import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface StudentData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  roll_number: string;
  student_class: string;
  date_of_birth: string;
  admission_date: string;
  status: string;
  assigned_teacher: number;
}

interface StudentState {
  students: StudentData[];
  loading: boolean;
  error: string;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: "",
};

export const fetchStudents = createAsyncThunk("students/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/api/students/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as StudentData[];
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || "Failed to fetch students");
  }
});

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentSlice.reducer;