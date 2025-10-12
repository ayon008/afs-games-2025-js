import axios from 'axios';

const GetFlag = async (name) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        return response.data[0]?.flags?.png || '';
    } catch (error) {
        console.error('Error fetching flag:', error);
        return '';
    }
};

export default GetFlag;
