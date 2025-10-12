'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetAwardsByCategory = (category) => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: awardsCategory, refetch } = useQuery({
        queryKey: [category, 'awards'], // Include `uid` in queryKey to refetch if `uid` changes
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/awards/${category}`);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
    });
    return { isLoading, isError, error, awardsCategory, refetch };
}

export default GetAwardsByCategory;