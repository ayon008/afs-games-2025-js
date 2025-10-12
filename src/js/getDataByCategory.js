import getUserLeaderBoard from "@/lib/getUserLeaderBoard";

const getDataByCategory = async (category) => {
    let data = await getUserLeaderBoard();
    const categoryData = data?.sort((a, b) => {
        const totalA = a.category.category ? a.category.category.total : 0;
        const totalB = b.category.category ? b.category.category.total : 0;
        return totalB - totalA;
    });
    return categoryData;
};

export default getDataByCategory;