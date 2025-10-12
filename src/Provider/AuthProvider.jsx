'use client'
import React, { createContext, useEffect, useRef, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail, confirmPasswordReset, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";

import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { useRouter } from 'next/navigation';
import { app } from '@/js/firebase.init';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const axiosPublic = useAxiosPublic();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const router = useRouter();

    // Google Sign-In
    const createWithGoogle = async () => {
        setLoader(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result;
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error;
        } finally {
            setLoader(false);
        }
    };

    // Create New Account
    const createAccount = async (email, password) => {
        setLoader(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            console.error("Account Creation Error:", error);
            throw error;
        } finally {
            setLoader(false);
        }
    };

    // Sign In with Email and Password
    const signIn = async (email, password) => {
        setLoader(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            console.error("Sign-In Error:", error);
            throw error;
        } finally {
            setLoader(false);
        }
    };

    // Log Out
    const logOut = async () => {
        setLoader(true);
        router.push('/');
        try {
            await signOut(auth);
            setUser(null);
            setUid(null);
            localStorage.removeItem('uid');
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("Logout Error:", error);
            throw error;
        } finally {
            setLoader(false);
        }
    };

    // Update User Profile
    const updatedProfile = async (name, photo) => {
        if (!auth.currentUser) return;
        try {
            await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
            console.log("Profile updated successfully.");
        } catch (error) {
            console.error("Profile Update Error:", error);
            throw error;
        }
    };

    // Password Reset
    const changePassword = async (email) => {
        if (!email) {
            console.error("Email is required for password reset");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent successfully.");
        } catch (error) {
            console.error("Password Reset Error:", error);
            throw error;
        }
    };
    const verifyPassword = async (actionCode, newPassword) => {
        try {
            await confirmPasswordReset(auth, actionCode, newPassword);
            console.log('Password reset successful');
            // Optionally redirect or update UI
        } catch (error) {
            // Handle errors
            console.error('Error resetting password:', error.message);
            // Optionally notify the user of the error
        }
    };

    const reauthenticateAndDelete = async (user, password) => {
        try {
            // 1. Get the user's credential (in this case, EmailAuthProvider)
            const credential = EmailAuthProvider.credential(user?.email, password);

            // 2. Re-authenticate the user
            await reauthenticateWithCredential(user, credential);

            // 3. Delete the user
            await deleteUser(user);
            console.log("User account deleted successfully");
        } catch (error) {
            console.error("Error re-authenticating or deleting user:", error.message);
        }
    };

    const deleteGoogleUser = async (user) => {
        // Get the currently logged-in user
        if (!user) {
            console.error("No user is currently logged in.");
            return;
        }

        try {
            // Delete the user account
            await deleteUser(user);
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const userInfo = {
        user,
        logOut,
        createWithGoogle,
        createAccount,
        signIn,
        loader,
        updatedProfile,
        changePassword,
        verifyPassword,
        reauthenticateAndDelete,
        deleteGoogleUser
    };

    const isRequestInProgress = useRef(false);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser && !isRequestInProgress.current) {
                localStorage.setItem('uid', JSON.stringify(currentUser?.uid));
                setLoader(false);
                setUid(currentUser?.uid);
                isRequestInProgress.current = true;
                console.log(currentUser);
                try {
                    const tokenResponse = await axiosPublic.post('/userToken', { email: currentUser.email });
                    const { token } = tokenResponse.data;
                    Cookies.set('userToken', token, { expires: 1 / 24, sameSite: 'Lax' })
                    setUser(currentUser);
                } catch (error) {
                    console.log(error.message);
                } finally {
                    isRequestInProgress.current = false;
                    setLoader(false);
                }
            } else if (!currentUser) {
                localStorage.removeItem('uid');
                Cookies.remove('userToken')
                setUser(null);
                setLoader(false);
                setUid(null);
            }
        });

        return () => {
            unSubscribe();
        };
    }, [auth, axiosPublic]);

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
