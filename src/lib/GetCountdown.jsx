'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetCountDown = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: date, refetch } = useQuery({
        queryKey: ['date'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/targetedDate/67067fa3adad600b40fda96c`);
                console.log(response.data);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
    });
    return { isLoading, isError, error, date, refetch };
}

export default GetCountDown;