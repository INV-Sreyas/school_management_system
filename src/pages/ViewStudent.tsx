// 🔵 unchanged
import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchStudents } from "../store/studentSlice";

const ViewStudent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading, error } = useSelector(
    (state: RootState) => state.student
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h5" gutterBottom>
        Student List
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      <Grid container spacing={2}>
        {students.map((student: any) => (
          <Grid item xs={12} md={6} lg={4} key={student.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {student.first_name} {student.last_name}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>Email: {student.email}</Typography>
                <Typography>Phone: {student.phone_number}</Typography>
                <Typography>Class: {student.student_class}</Typography>
                <Typography>Roll No: {student.roll_number}</Typography>
                <Typography>DOB: {student.date_of_birth}</Typography>
                <Typography>Admission: {student.admission_date}</Typography>
                <Typography>Status: {student.status}</Typography>
                <Typography>Assigned Teacher ID: {student.assigned_teacher}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewStudent;
