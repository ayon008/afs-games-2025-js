'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetAwards = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: awards, refetch } = useQuery({
        queryKey: ['awards'], // Include `uid` in queryKey to refetch if `uid` changes
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/awards`);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
    });
    return { isLoading, isError, error, awards, refetch };
}

export default GetAwards;