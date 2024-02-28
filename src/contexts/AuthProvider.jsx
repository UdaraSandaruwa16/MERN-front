import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Create a user account
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle errors gracefully, e.g., display user-friendly messages
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Gmail
  const signUpWithGmail = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log('User signed in with Gmail:', userCredential.user);
    } catch (error) {
      console.error('Error signing in with Gmail:', error);
      // Handle errors gracefully
    } finally {
      setLoading(false);
    }
  };

  // Login using email and password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle errors gracefully
    }
  };

  // Logout
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle errors gracefully
    }
  };

  // Update user profile
  const updateUserProfile = async (name, photoURL) => {
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      console.log('User profile updated');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle errors gracefully
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logOut,
    updateUserProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
