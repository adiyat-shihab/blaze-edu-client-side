import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.config.js";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../Hooks/UseAxiosOpen.jsx";
export const authContext = createContext(null);
export const AuthContext = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const axiosOpen = useAxiosOpen();
  const SignUp = (email, password, name, photo) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (r) =>
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        }),
    );
  };
  const Signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const SignOut = () => {
    return signOut(auth);
  };

  const { data } = useQuery({
    queryKey: ["Role", userDetails?.email],
    queryFn: async ({ queryKey }) => {
      return await axiosOpen.get(`/user/${queryKey[1]}`);
    },
  });

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserDetails(currentUser);
      } else {
        setUserDetails(null);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <authContext.Provider
      value={{ SignUp, Signin, userDetails, SignOut, data }}
    >
      {children}
    </authContext.Provider>
  );
};
