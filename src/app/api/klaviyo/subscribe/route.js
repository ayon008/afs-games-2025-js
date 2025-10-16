import axios from "axios";

export async function POST(req) {
    try {
        const { email, name, surName, pays } = await req.json();
        const id = pays?.toLowerCase() === 'france' ? process.env.KLAVIYO_LIST_ID_FRANCE : process.env.KLAVIYO_LIST_ID

        if (!email) return new Response(JSON.stringify({ success: false, message: "Email required" }), { status: 400 });

        // Step 1: Create or update profile
        const profileResponse = await axios.post(
            "https://a.klaviyo.com/api/profiles",
            {
                data: {
                    type: "profile",
                    attributes: {
                        email,
                        first_name: name,
                        last_name: surName,
                        properties: {
                            location: pays,
                        },
                    },
                },
            },
            {
                headers: {
                    Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "revision": "2024-10-15",
                },
            }
        );

        const profileId = profileResponse.data.data.id;

        // Step 2: Add profile to list
        await axios.post(
            `https://a.klaviyo.com/api/lists/${id}/relationships/profiles`,
            {
                data: [
                    {
                        type: "profile",
                        id: profileId,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "revision": "2024-10-15",
                },
            }
        );

        return new Response(JSON.stringify({ success: true, message: "Subscribed successfully!" }), { status: 200 });
    } catch (error) {
        console.error("Klaviyo API error:", error.response?.data || error.message);

        const message =
            error.response?.data?.message ||
            error.response?.data?.errors?.[0]?.detail ||
            "Failed to subscribe";

        return new Response(JSON.stringify({ success: false, message }), { status: 500 });
    }
}