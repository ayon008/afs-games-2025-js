const getSurroundingData = (array, index) => {
    if (!index) {
        return array.slice(0, 3);
    }
    if (array.length === 0) return []; // Return an empty array if the input array is empty
    if (index === 0) {
        // When the index is the first element, get the first 3 elements
        return array.slice(0, 3);
    } else if (index === array.length - 1) {
        // When the index is the last element, get the last 3 elements
        return array.slice(-3);
    } else {
        // For other indices, get the previous element, current element, and next element
        const start = Math.max(0, index - 1); // Ensure the start index is at least 0
        const end = Math.min(array.length, index + 2); // Ensure the end index is within the array length
        return array.slice(start, end);
    }
};
export default getSurroundingData;