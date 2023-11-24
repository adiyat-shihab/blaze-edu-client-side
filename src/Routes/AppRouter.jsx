import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../Page/Home.jsx";
import App from "../App.jsx";
import { Register } from "../Page/Register.jsx";
import { Login } from "../Page/Login.jsx";
import { ApplyTeacher } from "../Page/ApplyTeacher.jsx";
import { DashBoard } from "../Page/DashBoard.jsx";
import { TeacherRequest } from "../Page/Dashboard/TeacherRequest.jsx";
import { UserProfile } from "../Page/Dashboard/UserProfile.jsx";
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
          {
            path: "/dashboard/teacher/request",
            element: <TeacherRequest />,
          },
        ],
      },
    ],
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
