"use client"
import React, { createContext, useEffect, useRef, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail, confirmPasswordReset, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { useRouter } from 'next/navigation';
import { app } from '@/js/firebase.init';
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    console.log('AuthProvider mounted');
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
        try {
            await signOut(auth);
            setUser(null);
            setUid(null);
            localStorage.removeItem('uid');
            Cookies.remove('userToken');
            router.push('/');
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
        } catch (error) {
            console.error('Error resetting password:', error.message);
        }
    };

    const reauthenticateAndDelete = async (userObj, password) => {
        try {
            const credential = EmailAuthProvider.credential(userObj?.email, password);
            await reauthenticateWithCredential(userObj, credential);
            await deleteUser(userObj);
            console.log("User account deleted successfully");
        } catch (error) {
            console.error("Error re-authenticating or deleting user:", error.message);
        }
    };

    const deleteGoogleUser = async (userObj) => {
        if (!userObj) {
            console.error("No user is currently logged in.");
            return;
        }
        try {
            await deleteUser(userObj);
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const isRequestInProgress = useRef(false);

    useEffect(() => {
        setLoader(true);
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('onAuthStateChanged fired', currentUser);
            try {
                if (currentUser && !isRequestInProgress.current) {
                    isRequestInProgress.current = true;
                    localStorage.setItem('uid', JSON.stringify(currentUser?.uid));
                    setUid(currentUser?.uid);
                    try {
                        const tokenResponse = await axiosPublic.post('/userToken', { email: currentUser.email });
                        const { token } = tokenResponse.data || {};
                        if (token) Cookies.set('userToken', token, { expires: 1 / 24, sameSite: 'Lax' });
                    } catch (tokenErr) {
                        console.error('Failed to fetch user token:', tokenErr);
                    }
                    setUser(currentUser);
                } else if (!currentUser) {
                    setUser(null);
                    setUid(null);
                    Cookies.remove('userToken');
                    localStorage.removeItem('uid');
                }
            } catch (error) {
                console.error('Error in auth state change:', error);
                setUser(null);
                setUid(null);
                Cookies.remove('userToken');
                localStorage.removeItem('uid');
            } finally {
                isRequestInProgress.current = false;
                setLoader(false);
                console.log('AuthProvider loader set to', false);
            }
        });
        return () => unSubscribe();
    }, [auth, axiosPublic]);

    const authInfo = {
        user,
        loader,
        uid,
        createWithGoogle,
        createAccount,
        signIn,
        logOut,
        updatedProfile,
        changePassword,
        verifyPassword,
        reauthenticateAndDelete,
        deleteGoogleUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
