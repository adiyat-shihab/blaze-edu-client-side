import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase.config.js";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../Hooks/UseAxiosOpen.jsx";
export const authContext = createContext(null);
export const AuthContext = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosOpen = useAxiosOpen();
  const SignUp = (email, password, name, photo) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (r) =>
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        }),
    );
  };

  const provider = new GoogleAuthProvider();
  const Signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const SignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const { data } = useQuery({
    queryKey: ["Role", userDetails?.email],
    queryFn: async ({ queryKey }) => {
      return await axiosOpen.get(`/user/${queryKey[1]}`);
    },
  });

  const googleSign = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserDetails(currentUser);

        const userInfo = { email: currentUser.email };
        axiosOpen.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setUserDetails(null);
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <authContext.Provider
      value={{
        SignUp,
        Signin,
        googleSign,
        userDetails,
        loading,
        SignOut,
        data,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
