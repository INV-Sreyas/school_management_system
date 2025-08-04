import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useForm, Controller} from "react-hook-form";
import type {SubmitHandler, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axiosInstance from "../api/interceptor";
import { AxiosError } from "axios";
import type { ChangeEvent } from "react";

type FormValues = {
  file: FileList;
};

const schema = yup.object({
  file: yup
    .mixed<FileList>()
    .required("Please upload a CSV file")
    .test("fileFormat", "Only CSV files are allowed", (value) =>
      value?.[0]?.name.endsWith(".csv")
    ),
});

const UploadStudentCSV = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      file: undefined as unknown as FileList,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    try {
      const response = await axiosInstance.post(
        "/school/upload_csv/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message || "Upload successful!");
      reset();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || "Upload failed!");
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Students CSV
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      field.onChange(e.target.files);
                    }
                  }}
                />
                {errors.file && (
                  <Typography color="error" variant="body2">
                    {errors.file.message}
                  </Typography>
                )}
              </>
            )}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              Upload
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadStudentCSV;
