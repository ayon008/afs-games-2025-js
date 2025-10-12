'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetUserData = uid => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: userInfo, refetch } = useQuery({
        queryKey: ['userData', uid], // Include `uid` in queryKey to refetch if `uid` changes
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/user/${uid}`);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
    });
    return { isLoading, isError, error, userInfo, refetch };
}

export default GetUserData;