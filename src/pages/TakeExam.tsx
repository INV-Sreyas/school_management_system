// /pages/student/TakeExam.tsx

import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/interceptor';
import { toast } from 'react-toastify';

const TakeExam = () => {
  const { id: examId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const res = await api.get(`/exam/${examId}/questions/`);
      setQuestions(res.data);
    } catch (err) {
      toast.error('Failed to load questions.');
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [examId]);

  const handleOptionChange = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, selected_option]) => ({
      question_id: Number(questionId),
      selected_option,
    }));

    try {
      const res = await api.post(`/submit-exam/${examId}/`, {
        answers: formattedAnswers,
      });

      toast.success('Exam submitted!');
      navigate(`/student/exam/${examId}/complete`, {
        state: { score: res.data.score },
      });
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Submission failed';
      toast.error(msg);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Take Exam
      </Typography>

      {questions.map((q, index) => (
        <Paper key={q.id} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">{`Q${index + 1}. ${q.text}`}</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={answers[q.id] || ''}
              onChange={(e) => handleOptionChange(q.id, e.target.value)}
            >
              <FormControlLabel value="option1" control={<Radio />} label={q.option1} />
              <FormControlLabel value="option2" control={<Radio />} label={q.option2} />
              <FormControlLabel value="option3" control={<Radio />} label={q.option3} />
              <FormControlLabel value="option4" control={<Radio />} label={q.option4} />
            </RadioGroup>
          </FormControl>
        </Paper>
      ))}

      {questions.length > 0 && (
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Submit Exam
        </Button>
      )}
    </Container>
  );
};

export default TakeExam;
