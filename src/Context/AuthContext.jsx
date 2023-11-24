import { createContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config.js";
export const authContext = createContext(null);
export const AuthContext = ({ children }) => {
  const SignUp = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password);
  };
  return (
    <authContext.Provider value={{ SignUp }}>{children}</authContext.Provider>
  );
};
