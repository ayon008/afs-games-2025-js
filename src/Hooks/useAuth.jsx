import { AuthContext } from '@/Provider/AuthProvider';
import React, { useContext } from 'react';

const useAuth = () => {
    const userInfo = useContext(AuthContext);
    return userInfo;
};

export default useAuth;