import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../Page/Home.jsx";
import App from "../App.jsx";
import { Register } from "../Page/Register.jsx";
import { Login } from "../Page/Login.jsx";
import { ApplyTeacher } from "../Page/ApplyTeacher.jsx";
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
    ],
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
