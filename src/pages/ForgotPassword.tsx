import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../api/interceptor'; // ✅ Correct usage

// 🟢 1. Define form schema
const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
  // 🟢 2. Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [serverMessage, setServerMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // 🟢 3. Form submit handler
  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/accounts/password_reset/', { email: data.email });
      setServerMessage(response.data.message || 'Password reset email sent. Please check your inbox.');
      setErrorMessage('');
      reset();
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
      setServerMessage('');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" mb={2}>Forgot your password?</Typography>
      <Typography variant="body1" mb={3}>
        Enter your email address and we’ll send you a link to reset your password.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Send Reset Email
        </Button>
      </form>

      {/* 🟢 Show success or error message */}
      {serverMessage && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {serverMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default ForgotPassword;
