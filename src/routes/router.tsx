import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddTeacher from "../pages/AddTeacher";
import TeachersList from "../pages/TeachersList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/add-teacher",
    element: <AddTeacher/>
  },
  {
    path: "/dashboard/teachers",
    element: <TeachersList />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ), 
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
