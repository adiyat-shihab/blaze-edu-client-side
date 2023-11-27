import { UseAuth } from "../Hooks/UseAuth.jsx";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { loading, userDetails } = UseAuth();

  if (loading) {
    return;
  }
  if (userDetails) {
    return children;
  }
  return <Navigate to={"/login"} />;
};
