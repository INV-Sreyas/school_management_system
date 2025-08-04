// /pages/student/ExamSubmitted.tsx

import { useLocation, useParams } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api/interceptor';
import { toast } from 'react-toastify';

const ExamSubmitted = () => {
  const { id: examId } = useParams();
  const location = useLocation();
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const stateScore = location.state?.score;

  const fetchScore = async () => {
    try {
      const res = await api.get(`/student/exam/${examId}/submission/`);
      setScore(res.data.score);
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to load submission';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stateScore !== undefined) {
      setScore(stateScore);
      setLoading(false);
    } else {
      fetchScore();
    }
  }, [examId]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : score !== null ? (
          <>
            <Typography variant="h4" gutterBottom>
              Exam Submitted!
            </Typography>
            <Typography variant="h5">Your Score: {score.toFixed(2)}%</Typography>
          </>
        ) : (
          <Typography variant="h6">No submission found for this exam.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ExamSubmitted;
