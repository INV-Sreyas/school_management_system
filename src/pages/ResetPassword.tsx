import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../api/interceptor'; // 🔵 Adjust path if needed

const schema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(6),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [message, setMessage] = React.useState('');

  const onSubmit = async (data: any) => {
    try {
      await api.post(`/reset/${uidb64}/${token}/`, {
        new_password1: data.password,
        new_password2: data.confirmPassword,
      });
      setMessage('Password reset successful. You can now log in.');
      setTimeout(() => navigate('/login'), 2500);
    } catch (error: any) {
      setMessage('Something went wrong. Try again or request a new reset link.');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" mb={3}>Set New Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          type="password"
          label="New Password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          margin="normal"
        />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Reset Password
        </Button>
      </form>
      {message && (
        <Alert severity="info" sx={{ mt: 3 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default ResetPassword;
