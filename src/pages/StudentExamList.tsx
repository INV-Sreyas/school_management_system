// /pages/student/StudentExamList.tsx

import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/interceptor';
import { toast } from 'react-toastify';

const StudentExamList = () => {
  const [exams, setExams] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchExams = async () => {
    try {
      const res = await api.get('/student/exams/');
      setExams(res.data);
    } catch (err) {
      toast.error('Failed to fetch exams.');
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Available Exams
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <List>
          {exams.map((exam) => (
            <div key={exam.id}>
              <ListItem
                secondaryAction={
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/student/exam/${exam.id}`)}
                  >
                    Take Exam
                  </Button>
                }
              >
                <ListItemText
                  primary={exam.title}
                  secondary={exam.subject}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default StudentExamList;
