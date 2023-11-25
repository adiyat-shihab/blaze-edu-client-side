import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.config.js";
export const authContext = createContext(null);
export const AuthContext = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
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
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserDetails(currentUser);
        const userStore = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };
        localStorage.setItem("UserDetails", JSON.stringify(userStore));
      } else {
        setUserDetails(null);
        localStorage.removeItem("UserDetails");
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <authContext.Provider value={{ SignUp, Signin, userDetails, SignOut }}>
      {children}
    </authContext.Provider>
  );
};
