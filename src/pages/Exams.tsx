import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/interceptor';
import { toast } from 'react-toastify';

interface Exam {
  id: number;
  title: string;
  subject: string;
  date_created: string;
}

const ExamsList = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchExams = async () => {
    try {
      const response = await api.get('/exams/exams/');
      setExams(response.data);
    } catch (error) {
      toast.error('Failed to load exams.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Exams
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate('/create-exam')}
      >
        Create New Exam
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : exams.length === 0 ? (
          <Typography>No exams found.</Typography>
        ) : (
          <List>
            {exams.map((exam) => (
              <div key={exam.id}>
                <ListItemButton onClick={() => navigate(`/exam/${exam.id}`)}>
                  <ListItemText
                    primary={exam.title}
                    secondary={`Subject: ${exam.subject} | Created: ${new Date(
                      exam.date_created
                    ).toLocaleString()}`}
                  />
                </ListItemButton>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default ExamsList;
