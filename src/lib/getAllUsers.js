'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetAllUser = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: allUsers, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/allUsers`);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
    });
    return { isLoading, isError, error, allUsers, refetch };
}

export default GetAllUser;