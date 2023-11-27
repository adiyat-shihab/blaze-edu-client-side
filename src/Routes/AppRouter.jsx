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
import { ClassRequest } from "../Component/Dashboard/Admin Dashboard/ClassRequest.jsx";
import { MyClasses } from "../Component/Dashboard/Teacher Dashboard/MyClasses.jsx";
import { AddClasses } from "../Component/Dashboard/Teacher Dashboard/AddClasses.jsx";
import { MyEnrollClass } from "../Component/Dashboard/Student Dashboard/MyEnrollClass.jsx";
import { AllClass } from "../Page/AllClass.jsx";
import { SingleClass } from "../Component/Dashboard/Student Dashboard/SingleClass.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { EnrollClassDetails } from "../Component/Dashboard/Student Dashboard/EnrollClassDetails.jsx";
import { ClassAssignment } from "../Component/Dashboard/Teacher Dashboard/ClassAssignment.jsx";
import { ErrorElement } from "../Page/ErrorElement.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
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
        element: (
          <PrivateRoute>
            {" "}
            <ApplyTeacher />
          </PrivateRoute>
        ),
      },
      {
        path: "/all/class",
        element: <AllClass />,
      },
      {
        path: "/single/class/:id",
        element: (
          <PrivateRoute>
            <SingleClass />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "/dashboard",
            element: (
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            ),
          },
          //   Admin  route
          {
            path: "/dashboard/teacher/request",
            element: (
              <PrivateRoute>
                {" "}
                <TeacherRequest />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/users",
            element: (
              <PrivateRoute>
                <AllUsers />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/all/classes",
            element: (
              <PrivateRoute>
                <ClassRequest />
              </PrivateRoute>
            ),
          },
          //   Teacher Route
          {
            path: "/dashboard/teacher/my/classes",
            element: (
              <PrivateRoute>
                <MyClasses />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/teacher/class/add",
            element: (
              <PrivateRoute>
                <AddClasses />
              </PrivateRoute>
            ),
          },
          //    Student Route
          {
            path: "/dashboard/student/class",
            element: (
              <PrivateRoute>
                {" "}
                <MyEnrollClass />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/enroll/class/details/:id",
            element: (
              <PrivateRoute>
                <EnrollClassDetails />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/teacher/class/assignment/:id",
            element: (
              <PrivateRoute>
                <ClassAssignment />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
