import { Box, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: 500, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🎉 Welcome to the Dashboard!
          </Typography>
          <Typography variant="body1">
            This is a protected page — only visible after logging in.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
