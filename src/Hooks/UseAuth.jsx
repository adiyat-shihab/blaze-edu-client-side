import { useContext } from "react";
import { authContext } from "../Context/AuthContext.jsx";

export const UseAuth = () => {
  const auth = useContext(authContext);
  return auth;
};
