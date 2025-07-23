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
    roll_number: yup.string().required(),
    student_class: yup.string().required(),
    date_of_birth: yup.date().required(),
    admission_date: yup.date().required(),
    status: yup.string().oneOf(["active", "inactive"]).required(),
    assigned_teacher: yup.string().required(),
  });
  
  type StudentFormValues = yup.InferType<typeof schema>;
  
  const AddStudent = () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<StudentFormValues>({
      resolver: yupResolver(schema),
    });
  
    const navigate = useNavigate();
  
    const onSubmit = async (data: StudentFormValues) => {
      try {
        const payload = {
          ...data,
          date_of_birth: new Date(data.date_of_birth).toISOString().split("T")[0],
          admission_date: new Date(data.admission_date).toISOString().split("T")[0],
          assigned_teacher: Number(data.assigned_teacher),
        };
  
        console.log("Payload:", payload);
  
        await api.post(API_ENDPOINTS.REGISTER_STUDENTS, payload);
        alert("Student created successfully");
        navigate("/dashboard");
      } catch (err) {
        alert("Error creating student");
        console.error(err);
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" gutterBottom>
            Add Student
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
                { name: "roll_number", label: "Roll Number" },
                { name: "student_class", label: "Class" },
                { name: "assigned_teacher", label: "Assigned Teacher (ID)" },
              ].map(({ name, label, type = "text" }) => (
                <Grid item xs={6} key={name}>
                  <Controller
                    name={name as keyof StudentFormValues}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={type}
                        fullWidth
                        label={label}
                        error={!!errors[name as keyof StudentFormValues]}
                        helperText={errors[name as keyof StudentFormValues]?.message}
                      />
                    )}
                  />
                </Grid>
              ))}
  
              {/* 🟡 Date of Birth */}
              <Grid item xs={6}>
                <Controller
                  name="date_of_birth"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      fullWidth
                      label="Date of Birth"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.date_of_birth}
                      helperText={errors.date_of_birth?.message}
                    />
                  )}
                />
              </Grid>
  
              {/* 🟡 Admission Date */}
              <Grid item xs={6}>
                <Controller
                  name="admission_date"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      fullWidth
                      label="Admission Date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.admission_date}
                      helperText={errors.admission_date?.message}
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
  
  export default AddStudent;
  