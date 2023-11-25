import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../Page/Home.jsx";
import App from "../App.jsx";
import { Register } from "../Page/Register.jsx";
import { Login } from "../Page/Login.jsx";
import { ApplyTeacher } from "../Page/ApplyTeacher.jsx";
import { DashBoard } from "../Page/DashBoard.jsx";
import { TeacherRequest } from "../Component/Dashboard/Admin Dashboard/TeacherRequest.jsx";
import { UserProfile } from "../Component/Dashboard/UserProfile.jsx";
import { AllUsers } from "../Component/Dashboard/Admin Dashboard/AllUsers.jsx";
import { AllClasses } from "../Component/Dashboard/Admin Dashboard/AllClasses.jsx";
import { MyClasses } from "../Component/Dashboard/Teacher Dashboard/MyClasses.jsx";
import { AddClasses } from "../Component/Dashboard/Teacher Dashboard/AddClasses.jsx";
import { MyEnrollClass } from "../Component/Dashboard/Student Dashboard/MyEnrollClass.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/teacher/apply",
        element: <ApplyTeacher />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "/dashboard",
            element: <UserProfile />,
          },
          //   Admin  route
          {
            path: "/dashboard/teacher/request",
            element: <TeacherRequest />,
          },
          {
            path: "/dashboard/users",
            element: <AllUsers />,
          },
          {
            path: "/dashboard/all/classes",
            element: <AllClasses />,
          },
          //   Teacher Route
          {
            path: "/dashboard/teacher/my/classes",
            element: <MyClasses />,
          },
          {
            path: "/dashboard/teacher/class/add",
            element: <AddClasses />,
          },
          //    Student Route
          {
            path: "/dashboard/student/class",
            element: <MyEnrollClass />,
          },
        ],
      },
    ],
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
