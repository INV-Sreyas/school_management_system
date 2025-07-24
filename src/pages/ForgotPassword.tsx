import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../api/interceptor'; // 🔵 Adjust path as per your project

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [serverMessage, setServerMessage] = React.useState('');

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/accounts/password_reset/', { email: data.email });
      setServerMessage('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      setServerMessage('Something went wrong. Please try again.');
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
      {serverMessage && (
        <Alert severity="info" sx={{ mt: 3 }}>
          {serverMessage}
        </Alert>
      )}
    </Box>
  );
};

export default ForgotPassword;
