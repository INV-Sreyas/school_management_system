import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store"; 
import { fetchTeachers } from "../store/teacherSlice";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TeachersList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teachers, loading, error } = useSelector(
    (state: RootState) => state.teacher
  );

  const isAdmin = true;

  useEffect(() => {
    dispatch(fetchTeachers() as any);
  }, [dispatch]);

  const handleAddTeacher = () => {
    navigate("/add-teacher");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Teachers List</Typography>
        {isAdmin && (
          <Button variant="contained" onClick={handleAddTeacher}>
            Add Teacher
          </Button>
        )}
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher: any) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.id}</TableCell>
                  <TableCell>{teacher.first_name}</TableCell>
                  <TableCell>{teacher.last_name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TeachersList;
