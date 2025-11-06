import { AuthContext } from '@/Provider/AuthProvider';
import React, { useContext } from 'react';

const useAuth = () => {
    const authInfo = useContext(AuthContext);

    // If context is not yet provided (e.g., during SSR or before provider mounts),
    // return a safe default shape to avoid destructuring errors in consumers.
    if (!authInfo) {
        return {
            user: null,
            loader: true,
            uid: null,
        };
    }

    return authInfo;
};

export default useAuth;