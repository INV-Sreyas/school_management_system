import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import api from '../api/interceptor'; // ✅ use the interceptor

const CreateExam = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subject) {
      toast.error('Title and subject are required.');
      return;
    }

    try {
      const response = await api.post('/exams/exams/create/', {
        title,
        subject,
      });

      toast.success('Exam created successfully!');
      navigate('/exams'); // ✅ navigate to list view
    } catch (error: any) {
      const errMsg =
        error.response?.data?.error || 'Failed to create exam.';
      toast.error(errMsg);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom>
          Create New Exam
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Create Exam
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateExam;
