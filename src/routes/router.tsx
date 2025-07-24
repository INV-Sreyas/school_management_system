// 🔵 unchanged
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddTeacher from "../pages/AddTeacher";
import TeachersList from "../pages/TeachersList";
import UploadStudentCSV from "../pages/UploadStudentCSV";
import ForgotPassword from "../pages/ForgotPassword";

// 🟢 new imports
import AddStudent from "../pages/AddStudent";
import StudentsList from "../pages/ViewStudent"; 

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
    element: <AddTeacher />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
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
      {
        path: "add-student", // 🟢 nested path becomes /dashboard/add-student
        element: <AddStudent />,
      },
      {
        path: "students", // 🟢 nested path becomes /dashboard/students
        element: <StudentsList />,
      },
      {
        path: "students/upload",
        element: <UploadStudentCSV/>
      }
    ],
  },
]);

export default router;
