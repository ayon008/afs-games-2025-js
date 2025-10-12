import axios from 'axios';

// Function to call the backend API for password reset
const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post('/api/request-password-reset', { email });
        return response.data; // Handle success response
    } catch (error) {
        throw new Error(error.response.data.message || 'Error sending reset email');
    }
};

export default requestPasswordReset;