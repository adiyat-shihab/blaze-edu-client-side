import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../Page/Home.jsx";
import App from "../App.jsx";
import { Register } from "../Page/Register.jsx";
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
    ],
  },
]);
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
