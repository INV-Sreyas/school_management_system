import { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import api from '../api/interceptor';

const ExamQuestions = () => {
  const { id: examId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);

  // form states
  const [text, setText] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctOption, setCorrectOption] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text || !option1 || !option2 || !option3 || !option4 || !correctOption) {
      toast.error('All fields are required.');
      return;
    }

    try {
      await api.post('/add-question/', {
        exam_id: examId,
        text,
        option1,
        option2,
        option3,
        option4,
        correct_option: correctOption,
      });

      toast.success('Question added!');
      // Clear form
      setText('');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
      setCorrectOption('');

      fetchQuestions(); // Refresh list
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Failed to add question.';
      toast.error(msg);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Manage Questions
      </Typography>

      {/* Add Question Form */}
      <Paper elevation={3} sx={{ padding: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Question
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Question" value={text}
            onChange={(e) => setText(e.target.value)}
            margin="normal" multiline required
          />
          <TextField fullWidth label="Option 1" value={option1}
            onChange={(e) => setOption1(e.target.value)} margin="normal" required />
          <TextField fullWidth label="Option 2" value={option2}
            onChange={(e) => setOption2(e.target.value)} margin="normal" required />
          <TextField fullWidth label="Option 3" value={option3}
            onChange={(e) => setOption3(e.target.value)} margin="normal" required />
          <TextField fullWidth label="Option 4" value={option4}
            onChange={(e) => setOption4(e.target.value)} margin="normal" required />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Correct Option</InputLabel>
            <Select
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              label="Correct Option"
            >
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
              <MenuItem value="option4">Option 4</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
            Add Question
          </Button>
        </Box>
      </Paper>

      {/* Question List */}
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Existing Questions ({questions.length})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {questions.map((q, i) => (
            <ListItem key={q.id} divider>
              <ListItemText
                primary={`Q${i + 1}: ${q.text}`}
                secondary={
                  <>
                    <strong>A.</strong> {q.option1} &nbsp;&nbsp;
                    <strong>B.</strong> {q.option2} &nbsp;&nbsp;
                    <strong>C.</strong> {q.option3} &nbsp;&nbsp;
                    <strong>D.</strong> {q.option4}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ExamQuestions;
