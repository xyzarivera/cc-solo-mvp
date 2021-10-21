import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFunctions } from "firebase/functions";
import { useState, useEffect, useContext, createContext } from 'react';

export const app = initializeApp({
  projectId: process.env.REACT_APP_PROJECT_ID,
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  appId: process.env.REACT_APP_APP_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
});

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user, error }} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};

export const functions = getFunctions(app);
