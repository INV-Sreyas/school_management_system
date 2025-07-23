import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/interceptor";
import { API_ENDPOINTS } from "../api/apiConstants";
import { useNavigate } from "react-router-dom";

// 🧠 Validation schema
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).required(),
  email: yup.string().email().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone_number: yup.string().required(),
  subject_specialization: yup.string().required(),
  employee_id: yup.string().required(),
  date_of_joining: yup.date().required(),
  status: yup.string().oneOf(["active", "inactive"]).required(),
});

type TeacherFormValues = yup.InferType<typeof schema>;

const AddTeacher = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherFormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      const payload = {
        ...data,
        date_of_joining: new Date(data.date_of_joining).toISOString().split("T")[0],
      };

      console.log("Payload:", payload);

      await api.post(API_ENDPOINTS.REGISTER_TEACHER, payload);
      alert("Teacher created successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Error creating teacher");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Add Teacher
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {[
              { name: "username", label: "Username" },
              { name: "password", label: "Password", type: "password" },
              { name: "email", label: "Email" },
              { name: "first_name", label: "First Name" },
              { name: "last_name", label: "Last Name" },
              { name: "phone_number", label: "Phone Number" },
              { name: "subject_specialization", label: "Subject Specialization" },
              { name: "employee_id", label: "Employee ID" },
            ].map(({ name, label, type = "text" }) => (
              <Grid item xs={6} key={name}>
                <Controller
                  name={name as keyof TeacherFormValues}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={type}
                      fullWidth
                      label={label}
                      error={!!errors[name as keyof TeacherFormValues]}
                      helperText={errors[name as keyof TeacherFormValues]?.message}
                    />
                  )}
                />
              </Grid>
            ))}

            {/* 🟡 Date of Joining */}
            <Grid item xs={6}>
              <Controller
                name="date_of_joining"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    fullWidth
                    label="Date of Joining"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date_of_joining}
                    helperText={
                      errors.date_of_joining?.message
                    }
                  />
                )}
              />
            </Grid>

            {/* 🟡 Status */}
            <Grid item xs={6}>
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Status (active/inactive)"
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  />
                )}
              />
            </Grid>

            {/* 🟢 Submit button below form */}
            <Grid item xs={12}>
              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddTeacher;
