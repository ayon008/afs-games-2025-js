'use client'
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GetLeaderBoard = () => {
    const axiosSecure = useAxiosSecure();
    const { isLoading, isError, error, data: pointTable = [], refetch } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/totalPoints`);
                return response.data;
            } catch (err) {
                console.error("Error fetching user data:", err);
                throw err; // Rethrow the error to be caught by React Query
            }
        },
    });
    return { isLoading, isError, error, pointTable, refetch };
}

export default GetLeaderBoard;