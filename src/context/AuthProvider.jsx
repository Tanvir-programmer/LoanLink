import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children } = {}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- CREATE USER ----------------
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ---------------- LOGIN ----------------
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ---------------- GOOGLE LOGIN ----------------
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UPDATE PROFILE ----------------
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
    // Update local state with fresh values
    setUser({
      ...auth.currentUser,
      displayName: name,
      photoURL: photoURL,
    });
  };

  // ---------------- LOGOUT ----------------
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ---------------- AUTH STATE LISTENER ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed. Current User:", currentUser?.email);
      setUser(currentUser);
      setLoading(false); // Just set loading to false, no JWT calls needed
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    loading,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
