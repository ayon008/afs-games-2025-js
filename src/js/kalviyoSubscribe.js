'use client'
import axios from 'axios'
const sendDataToWebhook = async (data) => {
    console.log(data);
    const webhookUrl = 'https://hook.eu1.make.com/ll1c5gwel7rxs98ebohfx4h1urgu4kwn'; // Your webhook URL
    try {
        const response = await axios.post(webhookUrl, data);
        console.log('Data sent to webhook:', response.data);
    } catch (error) {
        console.error('Error sending data to webhook:', error);
    }
};


export default sendDataToWebhook;