'use client'
import axios from 'axios';
import useAuth from './useAuth';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useAxiosSecure = () => {
    const { logOut, user } = useAuth();
    const router = useRouter();

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000', // Adjust this to your actual base URL
    });

    // Request interceptor
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = Cookies.get('userToken');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axiosSecure.interceptors.response.use(
        (response) => {
            // Handle successful response
            return response;
        },
        async (error) => {
            console.log(error.message);

            const status = error.response?.status;
            if (status === 401 || status === 403) {
                // Unauthorized or Forbidden, log out and redirect to login
                await logOut();
                router.push('/login');
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
