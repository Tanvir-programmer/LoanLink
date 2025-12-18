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
import axios from "axios"; // ✅ Make sure axios is imported
const googleProvider = new GoogleAuthProvider();

// 💥 THE FIX APPLIED HERE 💥
// If props are undefined (which happens during certain render cycles),
// it defaults to {} so destructuring children is safe.
const AuthProvider = ({ children } = {}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ---------------- CREATE USER ----------------

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }; // ---------------- LOGIN ----------------

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }; // ---------------- GOOGLE LOGIN ----------------

  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider); // 🔥 ensure fresh user is stored

    setUser(result.user);
    setLoading(false);
    return result;
  }; // ---------------- UPDATE PROFILE ----------------

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    }); // 🔥 FORCE React state update with fresh values

    setUser({
      ...auth.currentUser,
      displayName: name,
      photoURL: photoURL,
    });
  }; // ---------------- LOGOUT ----------------

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }; // ---------------- AUTH STATE LISTENER ----------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth State Changed. Current User:", currentUser?.email); // 👈 Debugging log
      setUser(currentUser);

      if (currentUser?.email) {
        const loggedUser = { email: currentUser.email };
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            loggedUser,
            { withCredentials: true }
          );
          if (data.success) {
            console.log("✅ Token cookie set successfully");
          }
        } catch (err) {
          console.error("❌ JWT Error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        // Clear cookie on logout
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/logout`,
            {},
            { withCredentials: true }
          );
          console.log("Logout: Cookie cleared");
        } catch (err) {
          console.error("Logout Error:", err);
        } finally {
          setLoading(false);
        }
      }
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
