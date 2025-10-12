'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetSponsors = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: sponsors, refetch } = useQuery({
        queryKey: ['sponsors'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/sponsors`);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
    });
    return { isLoading, isError, error, sponsors, refetch };
}

export default GetSponsors;