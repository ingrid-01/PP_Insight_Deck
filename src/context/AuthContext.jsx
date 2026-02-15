import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { db, app } from "../lib/firebase"; // Import app to check validity
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth only if app exists
  const auth = app ? getAuth(app) : null;
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        // User is signed in.
        setUser(currentUser);

        if (db) {
          const userRef = doc(db, "users", currentUser.uid);
          try {
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
              await setDoc(userRef, {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
              });
            } else {
              await setDoc(
                userRef,
                { lastLogin: serverTimestamp() },
                { merge: true },
              );
            }
          } catch (e) {
            console.error("Profile sync error", e);
          }
        }
      } else {
        // User is signed out.
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async () => {
    if (!auth) {
      alert("Firebase Auth is not configured. Please add API keys to .env.");
      return;
    }
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loginAsGuest = () => {
    setUser({
      uid: "guest",
      displayName: "Guest User",
      email: "guest@local.demo",
      photoURL: null,
      isGuest: true,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loginAsGuest, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
